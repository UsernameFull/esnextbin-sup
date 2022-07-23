// 引入路径模块
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");


module.exports = {
    // 从哪里开始编译
    entry: "./src/index.tsx",
    // 编译到哪里
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    // 配置模块规则
    module: {
        noParse: /browserfs\.js/,
        rules: [
            {
                test: /\.tsx?$/,    // .ts或者tsx后缀的文件，就是typescript文件
                use: "ts-loader",   // 就是上面安装的ts-loader
                exclude: "/node-modules/" // 排除node-modules目录
            },
            {
                test: /\.wasm$/,
                use: "wasm-loader"
            },
            {
                test: /\.(sass|less|css)$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    // 模式
    mode: "development",
    devtool: 'source-map',
    // 解析ts
    resolve: {
        alias: {
            "fs": "browserfs/dist/shims/fs.js",
            "buffer": "browserfs/dist/shims/buffer.js",
            "path": "browserfs/dist/shims/path.js",
            "processGlobal": "browserfs/dist/shims/process.js",
            "bufferGlobal": "browserfs/dist/shims/bufferGlobal.js",
            "bfsGlobal": require.resolve("browserfs")
        },
        extensions: [".ts", ".tsx", ".vue", ".js", ".jsx"], // 配置ts文件可以作为模块加载
    },

    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./public/index.html",
                filename: "index.html"
            }
        ),
        // Expose BrowserFS, process, and Buffer globals.
        // NOTE: If you intend to use BrowserFS in a script tag, you do not need
        // to expose a BrowserFS global.
        new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' }),

    ],
    // 配置webpack-dev-server
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 9000,
        hot: true,
        open: true,
    }

}