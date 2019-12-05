import withDoctype from "./withDoctype.js";
import { render } from "../../web_modules/preact-render-to-string.js";
import { html } from "../../web_modules/htm/preact.js";
import BasePage from "../../client/components/shared/BasePage.js";
import Index from "../../client/components/pages/Index.js";

export default function(filePath, options, callback) {
  const { pageProps } = options;
  const debug = process.env.NODE_ENV !== "production";

  const pageElement = html`
    <${BasePage}
      head=${Index.Head}
      page=${Index.pageName}
      pageProps=${pageProps}
      debug=${debug}
    >
      <${Index} ...${pageProps} />
    <//>
  `;

  const rendered = render(pageElement);

  return callback(null, withDoctype(rendered));
}
