/**
 * Generate client-side initialization script for a page component.
 *
 * @param {Object} options
 * @param {string} options.page - Name of the page component to be rendered.
 * @param {Object} options.pageProps - Optional data to be serialized onto the
 *  page and passed in as props to the page component. This is how we can use
 *  server-side data to hydrate the component client-side.
 * @param {boolean} options.debug - If `true`, the Preact dev-tools will be
 *   imported.
 *
 * @returns {string}
 */
export default function createInitScript({ page, pageProps, debug }) {
  const script = `
    import { h, hydrate } from "/web_modules/preact.js";
    ${debug ? 'import "/web_modules/preact/debug.js"' : ""}
    import ${page} from "/client/components/pages/${page}.js";

    const mountElement = document.getElementById("${page}");
    ${pageProps ? `window.__DATA__ = ${JSON.stringify(pageProps)};` : ""}
    ${
      pageProps
        ? `hydrate(h(${page}, window.__DATA__), document.body);`
        : `hydrate(h(${page}), document.body);`
    }
  `;

  return script;
}
