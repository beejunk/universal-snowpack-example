import { html } from "../../../web_modules/htm/preact.js";

export const PAGE = "Index";

export const Head = html`
  <title>To-Do with Pika!</title>
`;

export default function Index() {
  return html`
    <div id=${PAGE}>
      <h1>Hello, world</h1>
    </div>
  `;
}
