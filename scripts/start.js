import server from "../server/server.js";

const { PORT = 3000 } = process.env;

/**
 * Start the application server. If `dev` is provided as the first command-line
 * flag, then the Snowpack Dev server will be used to serve client assets.
 * Otherwise, it is assumed the app is running in production and that there is
 * a `build` directory from which to serve client assets.
 */
async function start() {
  const dev = process.argv[2] === "dev";
  const app = await server(dev);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.info(`Listening on port ${PORT}`);
  });
}

start();
