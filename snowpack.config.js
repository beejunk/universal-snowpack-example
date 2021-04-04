// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

const isDev = process.env.NODE_ENV !== "production";

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    client: {
      url: "/",
      static: false,
      resolve: true,
    },
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: "none",
    hmr: isDev,
    // TODO: This setting does not seem to be respected. File bug report
    hmrPort: 3001,
  },
  buildOptions: {
    ssr: true,
  },
};
