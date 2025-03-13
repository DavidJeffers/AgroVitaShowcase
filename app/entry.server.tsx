import { PassThrough } from "node:stream";
import type { EntryContext } from "react-router";

export const environment = process.env.NODE_ENV || "production";
console.log(`Environment: ${environment}`);

async function MuiServerRouter({
  context,
  url,
}: {
  context: EntryContext;
  url: string;
}) {
  const { CacheProvider } = await import("@emotion/react");
  const { ThemeProvider } = await import("@emotion/react");
  const { CssBaseline } = await import("@mui/material");
  const { ServerRouter } = await import("react-router");
  const { default: theme } = await import("./theme/theme");
  const { default: createEmotionCache } = await import(
    "./theme/createEmotionCache"
  );

  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ServerRouter context={context} url={url} key="server-router" />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext
) {
  const { isbot } = await import("isbot");
  const userAgent = request.headers.get("user-agent") || "";

  return isbot(userAgent)
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        reactRouterContext
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        reactRouterContext
      );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;

    Promise.all([
      import("react-dom/server"),
      import("@react-router/node"),
      import("react-router"),
    ])
      .then(
        ([
          { renderToPipeableStream },
          { createReadableStreamFromReadable },
          { ServerRouter },
        ]) => {
          const { pipe, abort } = renderToPipeableStream(
            <ServerRouter context={reactRouterContext} url={request.url} />,
            {
              onAllReady() {
                shellRendered = true;
                const body = new PassThrough();
                const stream = createReadableStreamFromReadable(body);
                responseHeaders.set("Content-Type", "text/html");

                resolve(
                  new Response(stream, {
                    headers: responseHeaders,
                    status: responseStatusCode,
                  })
                );
                pipe(body);
              },
              onShellError(error: unknown) {
                reject(error);
              },
              onError(error: unknown) {
                responseStatusCode = 500;
                if (shellRendered) {
                  console.error(error);
                }
              },
            }
          );
          setTimeout(abort, 5000);
        }
      )
      .catch(reject);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let html = "";
    let shellRendered = false;

    Promise.all([
      import("./theme/createEmotionCache"),
      import("@emotion/server/create-instance"),
      import("react-dom/server"),
      import("@react-router/node"),
    ])
      .then(
        async ([
          { default: createEmotionCache },
          { default: createEmotionServer },
          { renderToPipeableStream },
          { createReadableStreamFromReadable },
        ]) => {
          const cache = createEmotionCache();
          const { extractCriticalToChunks } = createEmotionServer(cache);

          const { pipe, abort } = renderToPipeableStream(
            await MuiServerRouter({
              context: reactRouterContext,
              url: request.url,
            }),
            {
              onShellReady() {
                shellRendered = true;
                const body = new PassThrough();
                const stream = createReadableStreamFromReadable(body);
                responseHeaders.set("Content-Type", "text/html");

                const { styles } = extractCriticalToChunks(html);
                let stylesHTML = "";

                styles.forEach(({ key, ids, css }) => {
                  const emotionKey = `${key} ${ids.join(" ")}`;
                  stylesHTML = `${stylesHTML}<style data-emotion="${emotionKey}">${css}</style>`;
                });

                html = html.replace(
                  /<head>([^]*?)<\/head>/,
                  `<head>$1${stylesHTML}</head>`
                );

                resolve(
                  new Response(stream, {
                    headers: responseHeaders,
                    status: responseStatusCode,
                  })
                );
                pipe(body);
              },
              onShellError(error: unknown) {
                reject(error);
              },
              onError(error: unknown) {
                responseStatusCode = 500;
                if (shellRendered) {
                  console.error(error);
                }
              },
            }
          );
          setTimeout(abort, 5000);
        }
      )
      .catch(reject);
  });
}
