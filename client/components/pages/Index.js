import { html } from "../../../web_modules/htm/preact.js";

const PAGE = "Index";

function Index() {
  return html`
    <div id=${PAGE}>
      <h1>Hello, world</h1>
    </div>
  `;
}

Index.Head = html`
  <title>To-Do with Pika!</title>
`;

Index.pageName = PAGE;

export default Index;
