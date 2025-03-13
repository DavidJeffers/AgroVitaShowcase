import { LoaderFunctionArgs, redirect } from "react-router";
import { useLoaderData } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import SocialProfile from "~/components/profile/SocialProfile";
import { User } from "@supabase/supabase-js";
export async function loader({ params, request }: LoaderFunctionArgs) {
  const { username } = params;
  const supabase = createSupabaseServerClient(request);

  const {
    data: { user: currentUser },
  } = await supabase.client.auth.getUser();

  if (!username) {
    throw redirect("/");
  }

  const { data: profile } = await supabase.client
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  console.log("profile", profile);

  if (!profile) {
    throw new Response("Profile not found", { status: 404 });
  }

  const { data: followStats } = await supabase.client
    .rpc("get_follows_count", {
      user_id: profile.id,
    })
    .single();

  const { data: isFollowing } = await supabase.client
    .from("follows")
    .select("*")
    .match({
      follower_id: currentUser?.id,
      following_id: profile.id,
    })
    .single();

  console.log("isFollowing", isFollowing);

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
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  if (!currentUser) {
    return {
      profile,
      posts,
      currentUser: null,
      followStats,
      isFollowing: false,
      currentUserFavorites: null,
      currentUserProfile: null,
    };
  }

  const [profileResponse, favoritesResponse] = await Promise.all([
    supabase.client
      .from("profiles")
      .select("*")
      .eq("id", currentUser.id)
      .single(),
    supabase.client
      .from("favorites")
      .select("farm_id")
      .eq("user_id", currentUser.id),
  ]);

  const currentUserProfile = profileResponse.data;
  const currentUserFavorites = new Set(
    favoritesResponse.data?.map((f) => f.farm_id)
  );

  return {
    profile,
    currentUser,
    followStats,
    isFollowing: !!isFollowing,
    currentUserFavorites,
    currentUserProfile,
    posts,
  };
}

export default function PublicProfile() {
  const {
    profile,
    currentUser,
    followStats,
    isFollowing,
    currentUserFavorites,
    posts,
  } = useLoaderData<typeof loader>();

  return (
    <SocialProfile
      profile={profile}
      currentUser={currentUser as User}
      followStats={followStats}
      isFollowing={isFollowing}
      currentUserFavorites={currentUserFavorites}
      posts={posts}
    />
  );
}
