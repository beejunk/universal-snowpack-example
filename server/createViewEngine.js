import createInitScript from "./utils/createInitScript.js";
import withDoctype from "./utils/withDoctype.js";

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

    let BasePage;
    let Index;
    let html;
    let render;

    if (snowPackDevServer) {
      // Import assets from dev server runtime
      const runtime = snowPackDevServer.getServerRuntime();
      const basePageComponentImport = await runtime.importModule(
        "/components/shared/BasePage.js"
      );
      const indexComponentImport = await runtime.importModule(
        "/pages/Index.js"
      );
      const preactImport = await runtime.importModule("/utils/preact.js");

      BasePage = basePageComponentImport.exports.default;
      Index = indexComponentImport.exports.default;
      html = preactImport.exports.html;
      render = preactImport.exports.render;
    } else {
      // Import assets directly from build folder
      const basePageComponentImport = await import(
        "../build/components/shared/BasePage.js"
      );
      const indexComponentImport = await import("../build/pages/Index.js");
      const preactImport = await import("../build/utils/preact.js");

      BasePage = basePageComponentImport.default;
      Index = indexComponentImport.default;
      html = preactImport.html;
      render = preactImport.render;
    }

    const initScript = createInitScript({
      page: "Index",
      pageProps,
      debug: dev,
    });

    const pageElement = html`
      <${BasePage} head=${Index.Head} debug=${dev}>
        <${Index} ...${pageProps} />

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
