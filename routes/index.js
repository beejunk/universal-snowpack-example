import express from "express";
import render from "preact-render-to-string";

import html from "../client/utils/html";
import Index from "../client/components/pages/Index";

const index = express.Router();

index.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>${render(Index())}`);
});

export default index;
