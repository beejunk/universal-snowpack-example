import { h } from "../../web_modules/preact.mjs";
import htm from "../../web_modules/htm.mjs";
import withLayout from "../shared/withLayout.mjs";

const html = htm.bind(h);

const Head = html`
  <title>Creepy Pasta</title>
  <script src="/components/pages/Index.mjs" type="module"></script>
`;

function Index() {
  return html`
    <div id="Index">
      <h1>Hello, world</h1>
    </div>
  `;
}

Index.displayName = "Index";

export default withLayout(Index, Head);
