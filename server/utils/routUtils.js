export function getPageNameFromPath(pageFilePath) {
  const filePathParts = pageFilePath.split("/");
  const fileName = filePathParts[filePathParts.length - 1];

  return fileName.replace(".js", "");
}

export function getRouteFromFilePath(pageFilePath) {
  const pathWithExtension = pageFilePath.split("pages")[1];

  return pathWithExtension.replace(".js", "");
}
