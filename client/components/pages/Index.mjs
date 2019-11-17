import html from "../../utils/html.mjs";
import createInitScript from "../../utils/createInitScript.mjs";

const COMPONENT = "Index";

export const head = html`
  <title>To-Do with Pika!</title>
`;

function Index() {
  return html`
    <div id=${COMPONENT}>
      <h1>Hello, world</h1>
    </div>

    <script
      type="module"
      dangerouslySetInnerHTML="${{ __html: createInitScript(COMPONENT) }}"
    ></script>
  `;
}

export default Index;
