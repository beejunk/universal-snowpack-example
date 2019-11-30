import withDoctype from "./withDoctype.js";
import { render } from "../../web_modules/preact-render-to-string.js";
import { html } from "../../web_modules/htm/preact.js";
import BasePage from "../../client/components/shared/BasePage.js";
import * as pages from "../../client/components/pages/index.js";

export default function(filePath, props, callback) {
  const pathParts = filePath.split("/");
  const fileName = pathParts[pathParts.length - 1];
  const importName = fileName.replace(/\.js$/, "");
  const Page = pages[importName];

  const pageElement = html`
    <${BasePage} head=${Page.Head} page=${Page.pageName}>
      <${Page} ...${props} />
    <//>
  `;

  const rendered = render(pageElement);

  return callback(null, withDoctype(rendered));
}
