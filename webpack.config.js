// 引入路径模块
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  // 模式
  mode: "development",
  // 从哪里开始编译
  entry: "./src/index.tsx",
  // 编译到哪里
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  // 配置模块规则
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts或者tsx后缀的文件，就是typescript文件
        use: "ts-loader", // 就是上面安装的ts-loader
        exclude: "/node-modules/", // 排除node-modules目录
      },
      //   {
      //     test: /\.wasm$/,
      //     use: "wasm-loader",
      //   },
      {
        test: /\.wasm$/,
        use: `file-loader`,
      },
      {
        test: /\.(sass|less|css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map",
  //   experiments: {
  //     asyncWebAssembly: true,
  //     // syncWebAssembly: true,
  //   },
  // 解析ts
  resolve: {
    extensions: [".ts", ".tsx", ".vue", ".js", ".jsx"], // 配置ts文件可以作为模块加载
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/esbuild-wasm/esbuild.wasm",
          to: "esbuild.wasm",
          toType: "file",
        },
      ],
    }),
  ],
  // 配置webpack-dev-server
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
};
