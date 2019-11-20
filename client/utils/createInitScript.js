/**
 * Generate client-side initialization script for a page component.
 *
 * @param {string} page - Name of the page component to be rendered.
 * @returns {string}
 */
export default function createInitScript(page) {
  const script = `
    import { hydrate } from "/web_modules/preact.js";
    import { html } from "/web_modules/htm/preact.js";
    import ${page} from "/client/components/pages/${page}.js";

    const mountElement = document.getElementById("${page}");
    const page = html\`<${page} />\`;

    hydrate(page, mountElement);
  `;

  return script;
}
