import { LoaderFunctionArgs } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userId = params.id;
  const supabase = createSupabaseServerClient(request);

  if (!userId) {
    return [];
  }

  const { data: favorites } = await supabase.client
    .from("favorites")
    .select("farm_id")
    .eq("user_id", userId);

  console.log("favorites ran favs = ", favorites);

  if (!favorites || favorites.length === 0) {
    return [];
  }

  const { data: farms } = await supabase.client
    .from("farms")
    .select("*")
    .in(
      "id",
      favorites.map((f) => f.farm_id)
    );

  return farms || [];
}

export default function ApiRoute() {
  return null;
}
