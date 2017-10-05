const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MyPluginThatInteractsWithPostcss = require("./MyPluginThatInteractsWithPostcss");

module.exports = () => {

    return {
        context: __dirname,
        entry: {
            'app': './app.js',
            'sass': './sass.scss'
        },
        output: {
            path: __dirname + '/distribution',
            filename: '[name].js'
        },
        module: {
            rules: [

                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader' },
                            { loader: 'postcss-loader' },
                            { loader: 'sass-loader' }
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: '[name].css?[contenthash]',
                // allChunks: true // Enable this and all your problems get solved
            }),

            new MyPluginThatInteractsWithPostcss()

        ]
    }
}
