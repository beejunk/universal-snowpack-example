/**
 * Generate client-side initialization script for a page component.
 *
 * @param {string} page - Name of the page component to be rendered.
 * @returns {string}
 */
export default function createInitScript(page) {
  const script = `
    import { h, hydrate } from "/web_modules/preact.js";
    import ${page} from "/client/components/pages/${page}.js";

    const mountElement = document.getElementById("${page}");

    hydrate(h(${page}), document.body);
  `;

  return script;
}
