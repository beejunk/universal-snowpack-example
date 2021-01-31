import path from "path";
import _ from "lodash";

import recursiveReaddir from "./recursiveReaddir.js";

/**
 * @param {string} filePath
 * @returns {string}
 */
export function getPageNameFromPath(filePath) {
  const filePathParts = filePath.split("/");
  const fileName = filePathParts[filePathParts.length - 1];

  return _.capitalize(_.camelCase(fileName.replace(".js", "")));
}

/**
 * @param {string} filePath
 * @returns {string}
 */
export function getRouteFromFilePath(filePath) {
  const pathWithExtension = filePath.split("pages")[1];

  return pathWithExtension.replace(".js", "");
}

/**
 * @param {string} filePath
 * @returns {string}
 */
export function getImportFromFilePath(filePath) {
  return filePath.split("client")[1];
}

/**
 * @returns {Array<string>}
 */
export async function getRoutes() {
  const baseDir = path.join(process.cwd(), "client", "pages");
  const filePaths = await recursiveReaddir(baseDir);
  const routes = filePaths.map((fpath) => getRouteFromFilePath(fpath));

  return routes;
}
