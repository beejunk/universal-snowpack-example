import createInitScript from "./utils/createInitScript.js";
import withDoctype from "./utils/withDoctype.js";
import { getImportFromFilePath } from "./utils/routeUtils.js";
import db from "../db/db.js";

/**
 * Create an Express view engine.
 *
 * If a SnowpackDevServer instance is provided, then client assets will be
 * imported from the dev server runtime. If not, it is assumed the server
 * is running in production mode and a `build` directory exists from which
 * client assets will be imported.
 *
 * @param {import("snowpack").SnowpackDevServer} snowPackDevServer
 * @returns {Function}
 */
export default function createViewEngine(snowPackDevServer) {
  /**
   * Preact-based view engine.
   *
   * @param {string} filePath
   * @param {Object} options
   * @param {Function} callback
   */
  return async function viewEngine(filePath, options, callback) {
    const dev = !!snowPackDevServer;
    const pageImportPath = getImportFromFilePath(filePath);

    let BasePage;
    let PageComponent;
    let Head;
    let getServerProps;
    let html;
    let renderToString;

    if (snowPackDevServer) {
      // Import assets from dev server runtime
      const runtime = snowPackDevServer.getServerRuntime();

      const importPromises = [
        runtime.importModule("/components/shared/BasePage.js"),
        runtime.importModule(pageImportPath),
        runtime.importModule("/utils/preact.js"),
      ];

      const [
        basePageComponentImport,
        pageComponentImport,
        preactImport,
      ] = await Promise.all(importPromises);

      BasePage = basePageComponentImport.exports.default;
      PageComponent = pageComponentImport.exports.default;
      Head = pageComponentImport.exports.Head;
      getServerProps = pageComponentImport.exports.getServerProps;
      html = preactImport.exports.html;
      renderToString = preactImport.exports.renderToString;
    } else {
      // Import assets directly from build folder
      const importPromises = [
        import("../build/components/shared/BasePage.js"),
        import(`../build${pageImportPath}`),
        import("../build/utils/preact.js"),
      ];
      const [
        basePageComponentImport,
        pageComponentImport,
        preactImport,
      ] = await Promise.all(importPromises);

      BasePage = basePageComponentImport.default;
      PageComponent = pageComponentImport.default;
      Head = pageComponentImport.Head;
      getServerProps = pageComponentImport.getServerProps;
      html = preactImport.html;
      renderToString = preactImport.renderToString;
    }

    let pageProps = {};

    if (getServerProps) {
      pageProps = await getServerProps({ ctx: { db } });
    }

    const pageElement = html`
      <${BasePage} head=${Head} debug=${dev}>
        <${PageComponent} ...${pageProps} />

        ${PageComponent.initPage
          ? html`<script
              type="module"
              dangerouslySetInnerHTML="${{
                __html: createInitScript({
                  pageImportPath,
                  pageProps,
                  debug: dev,
                }),
              }}"
            />`
          : null}
      <//>
    `;

    let rendered;

    try {
      rendered = renderToString(pageElement);
    } catch (err) {
      return callback(err);
    }

    return callback(null, withDoctype(rendered));
  };
}
