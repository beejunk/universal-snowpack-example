export default function createInitScript(page) {
  const script = `
    import { hydrate } from "/web_modules/preact.mjs";
    import html from "/client/utils/html.mjs";
    import ${page} from "/client/components/pages/${page}.mjs";

    const mountElement = document.getElementById("${page}");

    hydrate(html\`<${page} />\`, mountElement);
  `;

  return script;
}
