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
 * @param {string} options.pageImportPath - Import page for the page component
 *   imported.
 *
 * @returns {string}
 */
export default function createInitScript(options) {
  const { pageProps, debug, pageImportPath } = options;
  const serializedPageProps = serialize(pageProps, { isJSON: true });

  const script = `
    import PageComponent from "${pageImportPath}";

    PageComponent.initPage(JSON.parse('${serializedPageProps}'));
  `;

  return script;
}
