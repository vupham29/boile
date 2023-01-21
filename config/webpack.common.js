const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dirApp = path.join(__dirname, '..', 'app');
const dirStyles = path.join(__dirname, '..', 'styles');
const dirShared = path.join(__dirname, '..', 'shared');
const dirPublic = path.join(__dirname, '..', 'public');
const dirNodeModules = path.join(__dirname, '..', 'node_modules');

module.exports = {
    entry: [path.join(dirApp, 'index.js'), path.join(dirStyles, 'index.scss')],

    output: {
        path: dirPublic
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            dirApp,
            dirShared,
            dirStyles,
            dirNodeModules
        ]
    },

    module: {
        rules: [

            {
                test: /\.(png|jpg|gif|jpe?g|svg|woff2?|fnt|webp|mp4)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[hash].[ext]',
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin({
            patterns: [

                {
                    from: dirShared,
                    to: dirPublic,
                    noErrorOnMissing: true
                }
            ]
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
};