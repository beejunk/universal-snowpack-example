import { promises as fs } from "fs";
import path from "path";

export async function getPageNames(pageFileNames) {
  const names = pageFileNames.map((fileName) => fileName.replace(".js", ""));

  return names;
}

export async function getPageImportPaths(pageFileNames) {
  const importPaths = pageFileNames.map((fileName) =>
    path.join(process.cwd(), "client", fileName)
  );

  return importPaths;
}

export async function createPageImportModule() {
  const pageFileNames = await fs.readdir(
    path.join(process.cwd(), "client", "pages")
  );
  const importPaths = await getPageImportPaths(pageFileNames);
  const fileNames = await getPageNames(pageFileNames);
  const importDeclarations = importPaths.map(
    (importPath) => `import("${importPath}")`
  );
}
