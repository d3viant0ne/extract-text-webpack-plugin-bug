const postcss = require('postcss')

class MyPluginThatInteractsWithPostcss {

    constructor() {
        this.initializer = postcss.plugin('demo-plugin', () => root => this.runPostCssCode(root))
    }

    apply(compiler) {

        compiler.plugin('compilation', compilation => {

            compilation.plugin('normal-module-loader', (loaderContext, { context, loaders }) => {

                /**
                 * Here i am looking if the user has used the postcss-loader
                 * and if so i inject a custom plugin on its options
                 */
                loaders.forEach(loader => {

                    if (loader.loader.match(/postcss-loader/)) {
                        loader.options = { plugins: [ this.initializer() ] }
                    }
                })

            })

        })

    }

    runPostCssCode() {
        console.log('I Should Run Only Once')
    }

}

module.exports = MyPluginThatInteractsWithPostcss
