import path from "path";

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
