var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.(less|scss|css|sass)$/,
            use: ["style-loader", "css-loader", "less-loader", "sass-loader"]
        }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public/'),
        historyApiFallback: true
    }
}