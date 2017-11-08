var path = require('path');
var webpack = require('webpack');

module.exports = (p, h) => ({
  devtool: 'eval',
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://' + h + ':' + p,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://' + h + ':' + p + '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: [' ', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
    }
  });
