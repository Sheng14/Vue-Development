module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:8080',
            bypass: function(req, res) {
              if (req.headers.accept.indexOf('html') !== -1) {
                console.log('Skipping proxy for browser request.');
                return '/index.html';
              } else {
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