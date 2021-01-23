/**
 * When using client component code on the server, it is important that the
 * same Preact module that is imported in the component is also imported
 * server-side when rendering. So all necessary Preact APIs are exported here
 * so that the server and component code can import them directly from the
 * Snowpack runtime (if running in development) or the `build` folder
 * (if run in production mode).
 *
 * @module
 */

import { h } from "preact";
import htm from "htm";
import { render as r } from "preact-render-to-string";

export const html = htm.bind(h);
export const render = r;
