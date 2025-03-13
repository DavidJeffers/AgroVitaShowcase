import { LoaderFunctionArgs, redirect } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    await supabase.client.auth.exchangeCodeForSession(code);
  }

  return redirect("/", { headers: supabase.headers });
}

export default function AuthCallback() {
  return null;
}
