var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackServerConfig = require('./webpack.config');

const webpackServer = (cfg) => {
  const h = cfg.hostname;
  const p = cfg.port + 1;
  const config = webpackServerConfig(p, h);

  const options = {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    port: p,
    host: h,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: "errors-only",
    clientLogLevel: "error"
  };

  const compiler = webpack(config);

  const server = new webpackDevServer(compiler, options);

  server.listen(p, h, (err, result) => {
    console.log(
      err
      ? err
      : `Listening at http://${h}:${p}`);
  });
}

export default webpackServer;
