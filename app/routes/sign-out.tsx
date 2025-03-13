import { ActionFunctionArgs } from "react-router";
import { signOut } from "~/utils/auth.supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await signOut(request, "/");
  } catch (error) {
    console.error("Error during sign-out:", error);
    return new Response("Failed to log out", { status: 500 });
  }
}
export const loader = () => {
  throw new Response("Method Not Allowed", { status: 405 });
};
