import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { Database } from "database.types";

// Create a single supabase server client for interacting with your database
export function createSupabaseServerClient(request: Request) {
  const supabase = {
    headers: new Headers(),
    client: createServerClient<Database>(
      // add later -> environment === "prod" ?  process.env.SUPABASE_URL! :  process.env.SUPABASE_DEV_URL!,
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(request.headers.get("Cookie") ?? "");
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              supabase.headers.append(
                "Set-Cookie",
                serializeCookieHeader(name, value, options)
              )
            );
          },
        },
      }
    ),
  };

  return supabase;
}
