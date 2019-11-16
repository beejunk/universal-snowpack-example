import { h } from "../../web_modules/preact.mjs";
import htm from "../../web_modules/htm.mjs";

const html = htm.bind(h);

function BasePage(props) {
  const { children, head } = props;

  return html`
    <html lang="en">
      <head>
        ${head}
      </head>

      <body>
        ${children}
      </body>
    </html>
  `;
}

export default BasePage;
