import path from "path";
import express from "express";

import viewEngine from "./utils/viewEngine.js";
import index from "./routes/index.js";

const { PORT = 3000 } = process.env;

const app = express();

app.engine("js", viewEngine);
app.set("views", path.resolve(process.cwd(), "client", "pages"));
app.set("view engine", "js");

app.use(
  "/web_modules",
  express.static(path.resolve(process.cwd(), "web_modules"))
);

app.use("/client", express.static(path.resolve(process.cwd(), "client")));

app.use("/", index);

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
