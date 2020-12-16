module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {// 包含需要修改的主题样式变量
                  'primary-color': '#1DA57A'
                },
                javascriptEnabled: true
            } 
        }
    },
    chainWebpack: config => { // 修改.svg文件的解析方式（url字符串 -----> 函数式组件）
      const svgRule = config.module.rule('svg')
  
      // 清除已有的所有 loader。
      // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
      svgRule.uses.clear()
  
      // 添加要替换的 loader
      svgRule
        .use('vue-svg-loader')
          .loader('vue-svg-loader')
    },
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:8080',
            bypass: function(req, res) {
              if (req.headers.accept.indexOf('html') !== -1) {
                console.log('Skipping proxy for browser request.');
                return '/index.html';
              } else if (process.env.MOCK !== "none") { // 确保mock存在且要调用才走mock路径
                  const name = req.path.split("/api/")[1].split("/").join("_"); // 拿到请求路径对应的文件名
                  const mock = require(`./mock/${name}`); // 根据文件名引入拿到对应的mock文件
                  const result = mock(req.method); // 往mock文件里面传方法参数拿到返回值
                  delete require.cache[require.resolve(`./mock/${name}`)]; // 去除缓存
                  return res.send(result); // 返回数据
              }
            }
          }
        }
    }
}