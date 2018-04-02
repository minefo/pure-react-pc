const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new  ExtractTextPlugin('css/[name].css?[contenthash]');


module.exports = {
    entry: {
        index:[
            'react-hot-loader/patch',
            './src/App.js'
        ],
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
    devServer: {
        hot: true,
        open: true,
        openPage: '',
        compress: true,
        port: 9001,
        useLocalIp: true,
        host: "0.0.0.0",
        historyApiFallback:true,
        disableHostCheck: true,
        proxy: {//本地代理
            '/xxx/': {
                target: 'http://127.0.0.1:8088/api/',
                secure: false
            },
        }
    },
    devtool: 'eval',
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
                    { loader: 'react-hot-loader/webpack' },
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
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title:"这里是title",
            filename:"index.html",
            template:"./index.html",
            inject: true,
            favicon:"./favicon.ico",
        }),
        new webpack.HotModuleReplacementPlugin(),
   ],

}