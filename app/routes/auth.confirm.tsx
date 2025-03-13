import { redirect, type LoaderFunctionArgs } from "react-router";

import { type EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") || "/";
  const headers = new Headers();

  if (token_hash && type) {
    const supabase = createSupabaseServerClient(request);

    const { error } = await supabase.client.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return redirect(next, { headers: supabase.headers });
    }
  }

  return redirect("/auth/auth-code-error", { headers });
}
