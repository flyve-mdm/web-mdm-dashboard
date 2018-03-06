const HtmlWebPackPlugin = require("html-webpack-plugin");
const paths = require('./config/paths');
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: paths.appSrc,
                loaders: [require.resolve('style-loader'), require.resolve('css-loader'), require.resolve('sass-loader')]
            },
            // "file" loader makes sure assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
                loader: require.resolve('file-loader'),
                // Exclude `js` files to keep "css" loader working as it injects
                // it's runtime that would otherwise processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.js$/, /\.html$/, /\.json$/],
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ]
};