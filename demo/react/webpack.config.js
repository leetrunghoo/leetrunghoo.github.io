var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './js/main.js',
    output: {
        path: './js/',
        filename: 'index.js'
    },
    devServer: {
        // historyApiFallback: help browserHistory (react-router) works after refreshing
        historyApiFallback: true,
        inline: true, // reload on the fly
        port: 3333
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                'style', // backup loader when not building .css file
                'css!sass' // loaders to preprocess CSS
            )
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}
