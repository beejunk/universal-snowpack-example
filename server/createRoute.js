import express from "express";

const { Router } = express;

export default function createRoute(routePath) {
  const route = Router();
  const template = routePath.split("/").pop();
  const endpoint = template === "Index" ? "/" : routePath;

  route.get(endpoint, (req, res) => {
    res.render(template);
  });

  return route;
}
