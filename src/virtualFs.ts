import type { Plugin } from "rollup";

import path = require("path");

const SEARCH_EXTENSIONS = [
  "/index.tsx",
  "/index.ts",
  "/index.js",
  ".tsx",
  ".ts",
  ".json",
  ".js",
];

function searchFile(
  vfs: Map<string, string>,
  filepath: string,
  extensions: string[]
) {
  for (const ext of ["", ...extensions]) {
    if (vfs.has(filepath + ext)) {
      return filepath + ext;
    }
  }
}

const isFileSchema = (id: string) =>
  id.startsWith("file://") || id.startsWith("/");

const isRelativePath = (id: string) => stripSchema(id).startsWith(".");
const stripSchema = (id: string) => id.replace(/^file\:(\/\/)?/, "");

export const virtualFs = ({
  files,
  extensions = SEARCH_EXTENSIONS,
  memoryOnly = true,
}: {
  files: { [k: string]: string };
  extensions?: string[];
  memoryOnly?: boolean;
}) => {
    // 初始化 vfs 映射字典
  const vfs = new Map(Object.entries(files));

  return {
    name: "virtual-fs",
    resolveId(id: string, importer: string | undefined) {
      const normalized = stripSchema(id);
      // entry point
      if (isFileSchema(id) && importer == null) {
        return searchFile(vfs, normalized, extensions);
      }
      // 解析相对路径
      if (importer && isFileSchema(importer) && isRelativePath(id)) {
        const rawImporter = importer.replace(/^file\:/, "");
        const fullpath = rawImporter
          ? path.resolve(path.dirname(rawImporter), normalized)
          : id;
        const reslovedWithExt = searchFile(vfs, fullpath, extensions);
        if (reslovedWithExt) return reslovedWithExt;
        this.warn(`[rollup-plugin-virtual-fs] can not resolve id: ${fullpath}`);
      }
    },
    load(id: string) {
      const real = stripSchema(id);
      const ret = vfs.get(real);
      if (ret) return ret;
      if (memoryOnly)
        throw new Error(`[virtualFs] ${id} is not found on files`);
    },
  } as Plugin;
};
