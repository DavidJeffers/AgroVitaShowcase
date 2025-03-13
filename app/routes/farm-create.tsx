// app/routes/farm-create.tsx
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import { useActionData } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import FarmCreateForm from "~/admin/farmCreation";
import { getUser } from "~/utils/auth.supabase.server";
import { UserRole } from "~/components/auth/userRoles";

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const user = await getUser(request);

  if (!user) {
    return redirect("/sign-in");
  }
  const { data: profile } = await supabase.client
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  console.log(profile);

  if (!profile) {
    return redirect("/sign-in");
  }

  if (profile.role !== UserRole.ADMIN) {
    return redirect("/");
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await getUser(request);
  if (!user) {
    return { error: "Unauthorized" };
  }

  const formData = await request.formData();
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;
  const name = formData.get("name") as string;
  const site = formData.get("site") as string;
  const foods = JSON.parse(formData.get("foods") as string);
  const standards = JSON.parse(formData.get("standards") as string);
  const verified = formData.get("verified") === "true";
  const shipping = formData.get("shipping") === "true";

  if (!latitude || !longitude || !name) {
    return { error: "Missing required fields" };
  }

  const supabase = createSupabaseServerClient(request);

  try {
    const { error } = await supabase.client.from("farms").insert({
      name,
      site,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      foods,
      standards,
      verified,
      shipping,
    });

    if (error) throw error;

    return redirect("/farms");
  } catch (error) {
    return { error: "Failed to create farm", errorMsg: error };
  }
}

export default function FarmCreate() {
  const actionData = useActionData<typeof action>();
  return <FarmCreateForm error={actionData?.error} />;
}
