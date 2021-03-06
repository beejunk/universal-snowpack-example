import path from "path";
import express from "express";
import snowpack from "snowpack";

import createViewEngine from "./createViewEngine.js";
import createRoute from "./createRoute.js";
import { getRoutes } from "./utils/routeUtils.js";
import snowpackConfig from "../snowpack.config.js";

const { startServer, createConfiguration } = snowpack;

const HMR_PORT = 3001;

/**
 * Creates the application server.
 *
 * @param {boolean} dev - If `true`, a SnowpackDevServer will be generated
 *   and used to serve client assets. If `false`, the server assumes there
 *   is a `build` directory where the client assets will be served from.
 * @returns {import("express").Application}
 */
export default async function server(dev) {
  const app = express();
  const config = createConfiguration(snowpackConfig);
  const routes = await getRoutes();

  let snowPackDevServer;

  if (dev) {
    config.devOptions.hmr = true;
    config.devOptions.hmrPort = HMR_PORT;
    snowPackDevServer = await startServer({ config });
    app.engine("js", createViewEngine(snowPackDevServer));
  } else {
    app.engine("js", createViewEngine());
  }

  app.set("views", path.join(process.cwd(), "client", "pages"));
  app.set("view engine", "js");

  routes.forEach((route) => {
    const routePath = route === "/Index" ? "/" : route.toLowerCase();
    app.use(routePath, createRoute(route));
  });

  if (snowPackDevServer) {
    app.use(snowPackDevServer.handleRequest);
  } else {
    app.use(express.static(path.join(process.cwd(), "build")));
  }

  return app;
}
