import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";
// import netlifyPlugin from "@netlify/vite-plugin-react-router";

const ReactCompilerConfig = {
  target: "19",
};

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      babel({
        // filter: /\.[jt]sx?$/,
        babelConfig: {
          presets: ["@babel/preset-typescript"], // if you use TypeScript
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
      reactRouter(),
      tsconfigPaths(),
      // {
      //   ...babel({
      //     filter: /\.tsx?$/,
      //     babelConfig: {
      //       presets: ["@babel/preset-typescript"],
      //       plugins: ["babel-plugin-react-compiler"],
      //     },
      //   }),
      //   apply: "build",
      // },
      // netlifyPlugin(),
    ],
    server: {
      port: 3000,
      proxy: {},
    },
    ssr: {
      noExternal: isProduction
        ? ["@mui/icons-material", "@mui/material"]
        : ["@mui/icons-material"],
    },
    // define: {
    //   "process.env.NODE_ENV": JSON.stringify(
    //     isProduction ? "production" : "development"
    //   ),
    // },
    // build: {
    //   // minify: isProduction,
    //   rollupOptions: {
    //     treeshake: isProduction,
    //   },
    // },
  };
});
