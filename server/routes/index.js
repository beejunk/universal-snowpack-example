import express from "express";

import { render } from "../../web_modules/preact-render-to-string.js";
import { html } from "../../web_modules/htm/preact.js";
import BasePage from "../../client/components/shared/BasePage.js";
import Index, { Head, PAGE } from "../../client/components/pages/Index.js";
import withDoctype from "../utils/withDoctype.js";

const index = express.Router();

index.get("/", (req, res) => {
  const page = html`
    <${BasePage} head=${Head} page=${PAGE}>
      <${Index} />
    <//>
  `;

  res.send(withDoctype(render(page)));
});

export default index;
