import serialize from "serialize-javascript";

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
  const serializedPageProps = serialize(pageProps, { isJSON: true });

  const script = `
    import ${page} from "/pages/${page}.js";
    import initPage from "/utils/initPage.js";

    initPage({
      pageProps: '${serializedPageProps}',
      pageComponent: ${page},
      debug: ${debug}
    })
  `;

  return script;
}
