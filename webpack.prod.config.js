const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new  ExtractTextPlugin('css/[name].css?[contenthash]');


var fs = require('fs'); // 引入fs模块
function deleteall(path) {
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
deleteall("./dist")

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: [
            `babel-polyfill`,
            `react`,
            `react-dom`,
            `react-router`,
        ],
    },
    output: {
        path: path.join(__dirname,"dist"),
        filename: 'js/[name]_bundle.js',
        chunkFilename: "js/chunk/[name]_[chunkhash].chunk.js"
    },
    devtool: false,
    resolve:{
        alias: {

        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    { loader: 'babel-loader?cacheDirectory' },
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader?minimize',
                    use: ['css-loader?minimize']
                })
            },
            {test: /\.jpe?g$|\.gif$|\.png$/, loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'},
            {test: /\.svg$|\.woff$|\.ttf$|\.eot$/, loader: 'url-loader?limit=81920&name=font/[hash:8].[name].[ext]'},
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor"
        }),
        extractCSS,
        new HtmlWebpackPlugin({
            title:"这里是title",
            filename:"index.html",
            template:"./index.html",
            inject: true,
            favicon:"./favicon.ico",
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }), //最小化一切
        new webpack.optimize.AggressiveMergingPlugin()//合并块
    ],

}