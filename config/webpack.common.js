const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dirApp = path.join(__dirname, '..', 'app');
const dirAssets = path.join(__dirname, '..', 'styles');
const dirShared = path.join(__dirname, '..', 'shared');
const dirPublic = path.join(__dirname, '..', 'public');

module.exports = {
    entry: [path.join(dirApp, 'index.js'), path.join(dirAssets, 'index.scss')],

    output: {
        path: dirPublic
    },

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': dirApp,
        },
    },

    module: {
        rules: [

            {
                test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
                loader: 'file-loader',
                options: {
                    name(file){
                        return '[hash].[ext]';
                    }
                }
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