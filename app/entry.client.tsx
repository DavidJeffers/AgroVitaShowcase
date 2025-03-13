import React from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import createEmotionCache from "./theme/createEmotionCache";
import theme from "./theme/theme";

/* Add HydrationErrorBoundary */
class HydrationErrorBoundary extends React.Component<{
  children: React.ReactNode;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (error.message.includes("Hydration failed")) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/* Update ClientCacheProvider with stable cache */
function ClientCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => createEmotionCache());
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

const hydrate = () => {
  React.startTransition(() => {
    ReactDOM.hydrateRoot(
      document,
      <ThemeProvider theme={theme}>
        <HydrationErrorBoundary>
          <ClientCacheProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <HydratedRouter />
          </ClientCacheProvider>
        </HydrationErrorBoundary>
      </ThemeProvider>
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  /* Safari doesn't support requestIdleCallback
  /* https://caniuse.com/requestidlecallback */
  setTimeout(hydrate, 1);
}
