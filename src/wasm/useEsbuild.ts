import * as esbuild from "esbuild-wasm";
import { resolvePlugin } from "./esbuild";

const fakefiles = new Map<string, string>();
fakefiles.set(
  "index.ts",
  "import { sum } from './sum'\n\nexport default sum(1,2)"
);
fakefiles.set("sum.ts", "export const sum = (a: number, b: number) => a + b");

let waiting = esbuild.initialize({
  worker: true,
  wasmURL: '/esbuild.wasm',
  //wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
});
export async function mybuild(files = fakefiles) {
  await waiting;
  const result = await esbuild.build({
    //...userConfig,
    entryPoints: ["/project/index.ts"],
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

export const version = esbuild.version;
// export function useEsbuild(onLoaded?: () => void) {
//   const loading = ref(true)
//   const error = ref<Error | null>(null)

//   onMounted(() => {
//     esbuild
//       .initialize({
//         wasmURL: `/esbuild.wasm`,
//       })
//       .then(() => {
//         loading.value = false
//         onLoaded && onLoaded()
//       })
//       .catch((_error) => {
//         error.value = _error
//       })
//       .finally(() => {
//         loading.value = false
//       })
//   })

//   return { loading, error, esbuild }
// }
