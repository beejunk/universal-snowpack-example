import { html } from "../../utils/preact.js";
import Navigation from "./Navigation.js";

function Layout(props) {
  const { children } = props;

  return html`
    <div class="container-fluid">
      <${Navigation} />

      ${children}
    </div>
  `;
}

export default Layout;
