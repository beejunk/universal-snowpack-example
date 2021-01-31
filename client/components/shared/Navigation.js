import { html } from "../../utils/preact.js";

function Navigation() {
  return html`
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-xl-6">
        <nav class="navbar navbar-light">
          <a class="navbar-brand" href="/">To-Do with Snowpack v3!</a>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `;
}

export default Navigation;
