import * as esbuild from "esbuild-wasm";
import { resolvePlugin } from "./esbuild";
import { useEffect } from "react";

const fakefiles = new Map<string, string>();
fakefiles.set(
    "index.ts",
    "import { sum } from './sum'\n\nexport default sum(1,2)"
);
fakefiles.set("sum.ts", "export const sum = (a: number, b: number) => a + b");

export const version = esbuild.version;

export const useEsbuild = () => {
    useEffect(() => {
        esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm',
        });
    }, []);

    const build = async (files = fakefiles) => {
        const result = await esbuild.build({
            //...userConfig,
            entryPoints: ["/project/index.tsx"],
            outdir: "/dist",
            format: "iife",
            write: false,
            bundle: true,
            plugins: [
                resolvePlugin({ cdnUrl: "https://unpkg.com", fileSystem: files }),
            ],
        });
        return result.outputFiles[0].text;
    }
    
    return build;
}