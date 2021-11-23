module.exports = {
  publicPath: './',
  lintOnSave: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.plugins.has('optimize-css') &&
      config.plugin('optimize-css').tap(([options]) => {
        options.cssnanoOptions.preset[1].svgo = false
        return [options]
      })
  },
  devServer: {
    port: 3000,
    disableHostCheck: true
  }
}
