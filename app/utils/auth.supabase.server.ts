import { redirect } from "react-router";
import { createSupabaseServerClient } from "./supabase.server";
import { environment } from "~/entry.server";
/* import { OAuthProvider } from "~/routes/sign-in"; */

export const signInWithPassword = async (
  password: string,
  email: string,
  request: Request,
  successRedirectPath: string
) => {
  const supabase = createSupabaseServerClient(request);
  const { error } = await supabase.client.auth.signInWithPassword({
    email,
    password,
  });

  if (!error) {
    return redirect(successRedirectPath, { headers: supabase.headers });
  }

  return { error: error.message, success: false };
};

export const signInWithOAuth = async (
  request: Request
  /* provider: OAuthProvider, 
  successRedirectPath: string */
) => {
  const supabase = createSupabaseServerClient(request);

  const { data, error } = await supabase.client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${
        environment === "development"
          ? "http://localhost:3000"
          : "https://agrovita.org"
      }/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (data.url) {
    return redirect(data.url, { headers: supabase.headers });
  }

  if (error) {
    return { error: error.message, success: false };
  }

  return null;
};

export const signOut = async (
  request: Request,
  successRedirectPath: string = "/"
) => {
  const supabase = createSupabaseServerClient(request);

  try {
    const { error } = await supabase.client.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return new Response("Sign-out failed", { status: 500 });
    }
    console.log("User signed out successfully");
    return redirect(successRedirectPath, { headers: supabase.headers });
  } catch (error) {
    console.error("Unexpected error during sign-out:", error);
    return new Response("Sign-out failed due to unexpected error", {
      status: 500,
    });
  }
};

export const getUser = async (request: Request) => {
  const supabase = createSupabaseServerClient(request);

  try {
    const {
      data: { user },
      error,
    } = await supabase.client.auth.getUser();

    if (error) {
      console.error("Error fetching session:", error.message);
      return null;
    }

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error in getUser:", error);
    return null;
  }
};

export const isUserLoggedIn = async (request: Request) => {
  const supabase = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  return !!user;
};

export const resetPassword = async (request: Request, email: string) => {
  const supabase = createSupabaseServerClient(request);
  const { error } = await supabase.client.auth.resetPasswordForEmail(email, {
    redirectTo: `${
      environment === "development"
        ? "http://localhost:3000"
        : "https://agrovita.org"
    }/auth/callback`,
  });
  if (error) {
    return { error: error.message, success: false };
  }
  return { success: true };
};

export const signUpWithPassword = async (
  password: string,
  email: string,
  request: Request,
  successRedirectPath: string
) => {
  const supabase = createSupabaseServerClient(request);
  const { error } = await supabase.client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        environment === "development"
          ? "http://localhost:3000"
          : "https://agrovita.org",
    },
  });

  if (!error) {
    throw redirect(successRedirectPath, { headers: supabase.headers });
  }

  return { error: error.message };
};
