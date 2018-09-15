
const webpack = require("webpack")
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
    entry: {
        miniChart: './src/minichart.js',
        bundle: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                }]
            })
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.(png|jpg|gif|eot|woff|svg|ttf|woff2)$/,
			loader: 'url-loader?limit=30000'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'miniChart',
            filename: 'miniChart.min.js',
        }),
        new ExtractTextPlugin({
            filename: '../css/style.min.css'
        })
    ]
}
