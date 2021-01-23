import { h, hydrate } from "preact";

/**
 * Hydrate page client-side.
 *
 * @param {Object} options
 * @param {boolean} options.debug - If `true`, will load Preact debugging script.
 * @param {import("preact").ComponentChild} options.pageComponent - Preact
 *   component for rendering the page. Will be mounted directly on the `body`
 *   element.
 * @param {Object} options.pageProps - Initial props for rendering the page
 *   component.
 */
export default function initPage({ debug, pageComponent, pageProps }) {
  if (debug) {
    import("preact/debug");
  }

  if (pageProps) {
    hydrate(h(pageComponent, JSON.parse(pageProps)), document.body);
  } else {
    hydrate(h(pageComponent), document.body);
  }
}
