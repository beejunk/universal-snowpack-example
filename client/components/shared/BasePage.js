import PropTypes from "prop-types";
import { html } from "../../utils/preact.js";

function BasePage(props) {
  const { children, head, debug } = props;

  return html`
    <html lang="en">
      <head>
        ${head}

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />

        ${debug &&
        html`
          <script
            dangerouslySetInnerHTML="${{
              __html: "window.HMR_WEBSOCKET_PORT = 3001;",
            }}"
          />
          <script type="module" src="/_snowpack/hmr-client.js"></script>
          <script type="module" src="/_snowpack/hmr-error-overlay.js"></script>
        `}
      </head>

      <body>
        ${children}
      </body>
    </html>
  `;
}

BasePage.propTypes = {
  children: PropTypes.element,
  head: PropTypes.element,
  debug: PropTypes.bool,
};

export default BasePage;
