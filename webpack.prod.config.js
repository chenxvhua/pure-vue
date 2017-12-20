const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new  ExtractTextPlugin('css/[name].css?[contenthash]');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const fs = require('fs-extra')
fs.removeSync('./dist')

var originalConfig = {
    entry: {
        index:[
            './src/entry.js'
        ],
        'vendor': ['vue','vuex','vue-router'],
    },
    output: {
        path: path.join(__dirname,"dist"),
        filename: 'js/[name]_bundle.js',
        chunkFilename: "js/chunk/[name]_[chunkhash].chunk.js"
    },
    devtool: false,
    resolve:{
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.join(__dirname,'./src') //简化路径
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
            {test: /\.vue$/,loader: 'vue-loader'},
            {
                test: /\.css$|.scss$/,
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
        new HtmlWebpackPlugin({
            title:"这里是title",
            filename:"index.html",
            template:"./index.html",
            inject: true,
            favicon:"./favicon.ico",
        }),
        extractCSS,
        new UglifyJSPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()//合并块
    ],

}

const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig
module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })