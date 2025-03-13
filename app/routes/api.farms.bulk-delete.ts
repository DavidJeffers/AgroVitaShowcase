import { ActionFunction } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export const action: ActionFunction = async ({ request }) => {
  const supabase = createSupabaseServerClient(request);

  if (request.method !== "DELETE") {
    return { error: "Method not allowed" };
  }

  const formData = await request.formData();
  const farmIdsJson = formData.get("farmIds");

  if (!farmIdsJson) {
    return { error: "No farms selected" };
  }

  try {
    const farmIds = JSON.parse(farmIdsJson as string);

    const { error } = await supabase.client
      .from("farms")
      .delete()
      .in("id", farmIds);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting farms:", error);
    return { error: "Failed to delete farms" };
  }
};
