import createInitScript from "./utils/createInitScript.js";
import withDoctype from "./utils/withDoctype.js";
import {
  getPageNameFromPath,
  getImportFromFilePath,
} from "./utils/routUtils.js";

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
   * Preact-based view engine. There's only one page (Index) in this example, so
   * it's a pretty simple implementation.
   *
   * @param {string} filePath
   * @param {Object} options
   * @param {Function} callback
   */
  return async function viewEngine(filePath, options, callback) {
    const { pageProps } = options;
    const dev = !!snowPackDevServer;
    const pageName = getPageNameFromPath(filePath);

    let BasePage;
    let PageComponent;
    let html;
    let render;

    if (snowPackDevServer) {
      // Import assets from dev server runtime
      const runtime = snowPackDevServer.getServerRuntime();

      const importPromises = [
        runtime.importModule("/components/shared/BasePage.js"),
        runtime.importModule(getImportFromFilePath({ filePath, dev })),
        runtime.importModule("/utils/preact.js"),
      ];

      const [
        basePageComponentImport,
        pageComponentImport,
        preactImport,
      ] = await Promise.all(importPromises);

      BasePage = basePageComponentImport.exports.default;
      PageComponent = pageComponentImport.exports.default;
      html = preactImport.exports.html;
      render = preactImport.exports.render;
    } else {
      // Import assets directly from build folder
      const importPromises = [
        import("../build/components/shared/BasePage.js"),
        import(getImportFromFilePath({ filePath, dev })),
        import("../build/utils/preact.js"),
      ];
      const [
        basePageComponentImport,
        pageComponentImport,
        preactImport,
      ] = await Promise.all(importPromises);

      BasePage = basePageComponentImport.default;
      PageComponent = pageComponentImport.default;
      html = preactImport.html;
      render = preactImport.render;
    }

    const initScript = createInitScript({
      page: pageName,
      pageProps,
      debug: dev,
    });

    const pageElement = html`
      <${BasePage} head=${PageComponent.Head} debug=${dev}>
        <${PageComponent} ...${pageProps} />

        <script
          type="module"
          dangerouslySetInnerHTML="${{
            __html: initScript,
          }}"
        />
      <//>
    `;

    let rendered;

    try {
      rendered = render(pageElement);
    } catch (err) {
      return callback(err);
    }

    return callback(null, withDoctype(rendered));
  };
}
