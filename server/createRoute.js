import express from "express";

const { Router } = express;

/**
 * Generate an Express route from the given route path.
 *
 * @param {string} routePath
 * @returns {Express.Router}
 */
export default function createRoute(routePath) {
  const route = Router();
  const template = routePath.slice(1);

  route.get("/", (req, res) => {
    res.render(template);
  });

  return route;
}
