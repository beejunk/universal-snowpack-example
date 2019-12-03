import { html } from "../../../web_modules/htm/preact.js";
import createInitScript from "../../utils/createInitScript.js";

function BasePage(props) {
  const { children, head, page, pageProps, debug } = props;
  const initScript = createInitScript({ page, pageProps, debug });

  return html`
    <html lang="en">
      <head>
        ${head}

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
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
