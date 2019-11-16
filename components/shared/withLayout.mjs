import BasePage from "./BasePage.mjs";
import { h } from "../../web_modules/preact.mjs";
import htm from "../../web_modules/htm.mjs";

const html = htm.bind(h);

function withLayout(WrappedComponent, Head) {
  const { displayName } = WrappedComponent;

  const initScript = `
    import { hydrate } from "/web_modules/preact.mjs";
    import htm from "/web_modules/htm.mjs";
    import ${displayName} from "/components/pages/${displayName}.mjs";

    hydrate(${displayName}(), document.getElementById("${displayName}"));
  `;

  function Layout(props) {
    return html`
      <${BasePage} head=${Head}>
        <${WrappedComponent} ...${props} />

        <script
          type="module"
          dangerouslySetInnerHTML="${{ __html: initScript }}"
        ></script>
      <//>
    `;
  }

  return Layout;
}

export default withLayout;
