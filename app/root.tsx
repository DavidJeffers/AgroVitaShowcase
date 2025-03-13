import * as React from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
  redirect,
  ShouldRevalidateFunction,
} from "react-router";
import { withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material";
import theme from "./theme/theme";
import ClientStyleContext from "./theme/ClientStyleContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/layout/Dashboard";
import { ThemeProvider } from "@mui/material/styles";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

import { LoaderFunctionArgs } from "react-router";
import { createSupabaseServerClient } from "./utils/supabase.server";
// import { useEffect } from "react";
import { User } from "@supabase/supabase-js";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const supabase = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  /* If no user and trying to access protected routes, redirect to sign in */
  const protectedRoutes = ["/profile", "/settings"];
  if (
    !user &&
    protectedRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    throw redirect("/sign-in");
  }

  if (!user) {
    return { user: null, profile: null, favorites: null };
  }

  /* Get both profile and favorites in parallel */
  const [profileResponse, favoritesResponse] = await Promise.all([
    supabase.client.from("profiles").select("*").eq("id", user.id).single(),
    supabase.client.from("favorites").select("farm_id").eq("user_id", user.id),
  ]);

  const { data: profile } = profileResponse;
  const { data: favorites } = favoritesResponse;

  return {
    user,
    profile,
    favorites: favorites?.map((f) => f.farm_id) || [],
  };
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ formAction }) => {
  if (formAction === "/sign-out" || formAction === "/sign-in") {
    return true;
  }
  return false;
};

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);
    useEnhancedEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />

          <meta name="theme-color" content={theme.palette.primary.main} />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          {children}

          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
);

/* https://remix.run/docs/en/main/route/component */
/* https://remix.run/docs/en/main/file-conventions/routes */
export default function App() {
  const { user, profile } = useLoaderData<typeof loader>();

  return (
    <Document>
      <ThemeProvider theme={theme}>
        <Dashboard user={user ? (user as User) : null} profile={profile}>
          <Outlet />
        </Dashboard>
      </ThemeProvider>
    </Document>
  );
}

/* https://remix.run/docs/en/main/route/error-boundary */
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    let message;
    switch (error.status) {
      case 401:
        message = (
          <p>
            Oops! Looks like you tried to visit a page that you do not have
            access to.
          </p>
        );
        break;
      case 404:
        message = (
          <p>Oops! Looks like you tried to visit a page that does not exist.</p>
        );
        break;

      default:
        throw new Error(error.data || error.statusText);
    }

    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <Layout>
          <h1>
            {error.status}: {error.statusText}
          </h1>
          {message}
        </Layout>
      </Document>
    );
  }

  if (error instanceof Error) {
    console.error(error);
    return (
      <Document title="Error!">
        <Layout>
          <div>
            <h1>There was an error</h1>
            <p>{error.message}</p>
            <hr />
            <p>
              Hey, developer, you should replace this with what you want your
              users to see.
            </p>
          </div>
        </Layout>
      </Document>
    );
  }

  return <h1>Unknown Error</h1>;
}
