import { ActionFunctionArgs } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  console.log("api.social.ts action ran");
  const formData = await request.formData();
  const supabase = createSupabaseServerClient(request);
  const action = formData.get("action") as
    | "like"
    | "unlike"
    | "follow"
    | "unfollow"
    | "comment"
    | "delete";

  console.log("api.social.ts action = ", action);

  switch (action) {
    case "like":
    case "unlike": {
      const postId = formData.get("postId") as string;
      const userId = formData.get("userId") as string;

      if (action === "like") {
        console.log("like", postId, userId);
        await supabase.client
          .from("likes")
          .insert({ user_id: userId, post_id: postId });
      } else {
        await supabase.client
          .from("likes")
          .delete()
          .match({ user_id: userId, post_id: postId });
      }
      return { success: true };
    }

    case "follow":
    case "unfollow": {
      const followerId = formData.get("followerId") as string;
      const followingId = formData.get("followingId") as string;
      if (action === "follow") {
        await supabase.client
          .from("follows")
          .insert({ follower_id: followerId, following_id: followingId });
      } else {
        await supabase.client
          .from("follows")
          .delete()
          .match({ follower_id: followerId, following_id: followingId });
      }
      return { success: true };
    }

    case "comment": {
      const postId = formData.get("postId") as string;
      const userId = formData.get("userId") as string;
      const content = formData.get("content") as string;

      const { data: commentData, error: commentError } = await supabase.client
        .from("comments")
        .insert({
          user_id: userId,
          post_id: postId,
          content,
        })
        .select("*")
        .single();

      if (commentError) return { error: commentError.message };

      const { data: profileData, error: profileError } = await supabase.client
        .from("profiles")
        .select("username, profile_pic_url")
        .eq("id", userId)
        .single();

      if (profileError) return { error: profileError.message };

      const comment = {
        ...commentData,
        user: profileData,
      };

      return { comment };
    }

    case "delete": {
      const postId = formData.get("postId") as string;
      const userId = (await supabase.client.auth.getUser()).data.user?.id;
      console.log("postId", postId);
      console.log("userId", userId);

      if (!userId) {
        return { success: false, error: "Not authenticated", status: 401 };
      }

      const { data: post } = await supabase.client
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (!post) {
        return { success: false, error: "Post not found" };
      }

      if (post.user_id !== userId) {
        return { success: false, error: "Not authorized to delete this post" };
      }

      console.log("post", post);

      if (post.image_urls && post.image_urls.length > 0) {
        const { data, error: storageError } = await supabase.client.storage
          .from("post-images")
          .remove(post.image_urls);

        console.log("Delete result:", { data, storageError });
      }

      const { error: deleteError } = await supabase.client
        .from("posts")
        .delete()
        .eq("id", postId);

      if (deleteError) {
        return { success: false, error: "Failed to delete post" };
      }

      return { success: true };
    }

    default:
      return { error: "Invalid action" };
  }
}
