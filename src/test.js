// const BrowserFS = require("browserfs");

// BrowserFS.install(window);
// BrowserFS.configure({ fs: "LocalStorage" }, (err:Error) => {
//   if (err) {
//     alert(err);
//   } else {
//     console.log("BrowserFS configured");
//   }
// });

// var fs = require('fs');
// fs.writeFile('/abc.js', 'Cool, BrowserFS works!', function(err:Error) {
//   fs.readFile('/abc.js', function(err:Error, contents: { toString: () => any; }) {
//     console.log(contents.toString());
//   });
// });

// import { rollup, RollupOutput } from "rollup";

// import { virtualFs } from "./virtualFs";

// const files = {
//   "/index.js": `import foo from "./foo";
//   export default () => console.log(foo);
//   `,
//   "/foo.js": 'export default "foo"',

//   };

// async function goBundle() {
//   let bundle;
//   try {
//     bundle = await rollup({
//       input: "file:///index.js",
//       plugins: [
//         virtualFs({
//           extensions: [".ts", ".tsx", ".js", "/index.js"], // Optional
//           files: files,
//         }),
//       ],
//     });
//   } catch (e) {
//     console.log("ERROR at rollup", e.message);
//     console.log(e)
//     return;
//   }

//   let bundled:RollupOutput;

//   try {
//     bundled = await bundle.generate({
//       format: "iife",
//       name: "myBundle"
//     });
//   } catch (e) {
//     console.log("ERROR while bundling", e.message);
//   }

//   console.log(bundled.output[0].code);
//   eval(bundled.output[0].code);
// }

// goBundle();

const Files = {
  "index.ts": "import {sum} from './sum';\nlet a = 1;",
  "sum.ts": "export const sum = (a, b) => a + b;",
  "index.html": "<html></html>",
  "index.css": "<style></style>",
};
const isJSFILE =  /.(js|ts|jsx|tsx)$/i;

let res = Object.keys(Files)
  .filter((k) => isJSFILE.test(k))

  console.log(res);