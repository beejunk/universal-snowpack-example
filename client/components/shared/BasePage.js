import { html } from "../../../web_modules/htm/preact.js";
import createInitScript from "../../utils/createInitScript.js";

function BasePage(props) {
  const { children, head, page, pageProps, debug } = props;
  const initScript = createInitScript({ page, pageProps, debug });

  return html`
    <html lang="en">
      <head>
        ${head}
      </head>

      <body>
        ${children}

        <script
          type="module"
          dangerouslySetInnerHTML="${{ __html: initScript }}"
        />
      </body>
    </html>
  `;
}

export default BasePage;
