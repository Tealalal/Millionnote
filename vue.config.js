module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 配置 webpack-dev-server 行为。
// outputDir: 'dist',   //build输出目录
// assetsDir: 'assets', //静态资源目录（js, css, img）
// lintOnSave: false, //是否开启eslint
devServer: {
  open: true, //是否自动弹出浏览器页面
  host: "localhost", 
  port: '8080',
  https: false,
  hotOnly: false, 
  proxy: null,
}
}
