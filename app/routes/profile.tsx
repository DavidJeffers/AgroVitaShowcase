import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import { useLoaderData, useActionData } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import ProfilePage from "~/components/profile/ProfilePage";

interface UpdateProfilePayload {
  full_name: string;
  username: string;
  profile_pic_url: string;
  description?: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const supabase = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  // If no user and trying to access protected routes, redirect to sign in
  const protectedRoutes = ["/profile", "/settings"];
  if (
    !user &&
    protectedRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    throw redirect("/sign-in");
  }

  if (!user) {
    return { user: null, profile: null, favorites: null };
  }

  const { data: followStats } = await supabase.client
    .rpc("get_follows_count", {
      user_id: user.id,
    })
    .single();

  const { data: posts } = await supabase.client
    .from("posts")
    .select(
      `
    *,
    farms ( name, verified ),
    profiles!posts_user_mention_fkey ( username ),
    comments (
      id,
      content,
      created_at,
      profiles (username, profile_pic_url)
    ),
    likes (
      *
    )
  `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  let canUserPost = true;
  const POST_LIMIT = 15;
  if (posts) {
    const userPostCount = posts.filter((post) => {
      return (
        new Date(post.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      );
    }).length;

    canUserPost = userPostCount < POST_LIMIT;
  }

  // Get both profile and favorites in parallel
  const [profileResponse, favoritesResponse] = await Promise.all([
    supabase.client.from("profiles").select("*").eq("id", user.id).single(),
    supabase.client.from("favorites").select("farm_id").eq("user_id", user.id),
  ]);

  const { data: profile } = profileResponse;
  const { data: favorites } = favoritesResponse;

  return {
    user,
    profile,
    favorites: user
      ? new Set(favorites?.map((f) => f.farm_id) || [])
      : undefined,
    followStats,
    posts,
    canUserPost,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const formData = await request.formData();
  const action = formData.get("action") as "updateProfile" | "createPost";

  switch (action) {
    case "updateProfile": {
      const {
        data: { user },
      } = await supabase.client.auth.getUser();

      if (!user) {
        return { success: false, error: "Not authenticated", status: 401 };
      }

      const formData = await request.formData();
      const payload: UpdateProfilePayload = {
        full_name: formData.get("name") as string,
        username: formData.get("username") as string,
        profile_pic_url: formData.get("profile_pic_url") as string,
        description: formData.get("description") as string,
      };

      // Validate username length
      if (payload.username.length < 3) {
        return {
          success: false,
          error: "Username must be at least 3 characters long",
          status: 400,
        };
      }

      // Check if username is already taken (excluding current user)
      const { data: existingUser } = await supabase.client
        .from("profiles")
        .select("username")
        .eq("username", payload.username)
        .neq("id", user.id)
        .single();

      if (existingUser) {
        return {
          success: false,
          error: "Username is already taken",
          status: 400,
        };
      }

      // Update the profile
      const { error: updateError, data: updatedProfile } = await supabase.client
        .from("profiles")
        .update(payload)
        .eq("id", user.id)
        .select()
        .single();

      if (updateError) {
        return {
          success: false,
          error: "Failed to update profile",
          status: 500,
        };
      }

      return { success: true, updatedProfile };
    }

    case "createPost": {
      const content = formData.get("content") as string;
      const images = formData.getAll("image") as File[];
      const userId = (await supabase.client.auth.getUser()).data.user?.id;

      if (!userId) {
        return { success: false, error: "Not authenticated", status: 401 };
      }

      let imageUrls: string[] = [];

      // Upload multiple images if present
      if (images && images.length > 0) {
        try {
          const uploadPromises = images.map(async (image) => {
            const fileName = `${userId}/${Date.now()}-${image.name}`;
            const { data, error } = await supabase.client.storage
              .from("post-images")
              .upload(fileName, image);

            if (error) throw error;
            return data.path;
          });

          imageUrls = await Promise.all(uploadPromises);
        } catch (error) {
          console.error("Failed to upload images", error);
          return { success: false, error: "Failed to upload images" };
        }
      }

      try {
        const { error } = await supabase.client.from("posts").insert({
          content,
          user_id: userId,
          image_urls: imageUrls.length > 0 ? imageUrls : null,
        });

        if (error) throw error;
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: "Failed to create post",
          errorMsg: error,
        };
      }
    }

    default:
      return { success: false, error: "Invalid action" };
  }
}

export default function Profile() {
  const { profile, favorites, followStats, posts, user, canUserPost } =
    useLoaderData();
  const actionData = useActionData<typeof action>();

  if (!profile) {
    return redirect("/sign-in");
  }

  return (
    <ProfilePage
      profile={profile}
      actionData={actionData}
      favorites={favorites}
      followStats={followStats}
      posts={posts}
      currentUser={user}
      canUserPost={canUserPost}
    />
  );
}
