import { ActionFunctionArgs } from "react-router";
import { Farm } from "~/components/farms/table/FarmTable";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const supabase = createSupabaseServerClient(request);
  const formData = await request.formData();
  const farms = JSON.parse(formData.get("farms") as string);

  try {
    const { data, error } = await supabase.client.from("farms").insert(
      farms.map((farm: Farm) => ({
        name: farm.name,
        latitude: farm.latitude,
        longitude: farm.longitude,
        shipping: farm.shipping,
        site: farm.site || null,
        foods: farm.foods,
        standards: farm.standards,
        state: farm.state,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        favs: 0,
        verified: false,
      }))
    );
    console.log("data", data);
    console.log("error", error);
    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to insert farms",
        errorMsg: error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
