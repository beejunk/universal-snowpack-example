import path from "path";

import recursiveReaddir from "./recursiveReaddir.js";

export function getPageNameFromPath(filePath) {
  const filePathParts = filePath.split("/");
  const fileName = filePathParts[filePathParts.length - 1];

  return fileName.replace(".js", "");
}

export function getRouteFromFilePath(filePath) {
  const pathWithExtension = filePath.split("pages")[1];

  return pathWithExtension.replace(".js", "");
}

export function getImportFromFilePath(options) {
  const { filePath, dev = false } = options;
  const importPath = filePath.split("client")[1];

  if (dev) {
    return importPath;
  }

  return path.join(process.cwd(), "build", importPath);
}

export async function getRoutes() {
  const baseDir = path.join(process.cwd(), "client", "pages");
  const filePaths = await recursiveReaddir(baseDir);
  const routes = filePaths.map((fpath) => getRouteFromFilePath(fpath));

  return routes;
}
