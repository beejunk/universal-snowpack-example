import { html } from "../utils/preact";
import Layout from "../components/shared/Layout.js";

const PAGE = "About";

function About() {
  return html`
    <${Layout}>
      <main id=${PAGE} class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-xl-6">
            <h1>About</h1>

            <hr />

            <h2>Technologies Used</h2>

            <ul>
              <li><a href="https://snowpack.dev/">Snowpack</a></li>
              <li><a href="https://preactjs.com/">Preact</a></li>
              <li><a href="https://expressjs.com/">Express</a></li>
            </ul>

            <h2>More Info</h2>

            <ul>
              <li>
                <a href="https://github.com/beejunk/universal-snowpack-example">
                  Source code
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    <//>
  `;
}

About.hydrate = false;

export const Head = html`<title>About</title>`;

export default About;
