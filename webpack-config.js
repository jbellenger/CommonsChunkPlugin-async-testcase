var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    pageA: './entry',
    pageB: './entry',
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '',
    filename: '[name].[chunkhash:6].js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      production: true,
      template: './index-template.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: '[name].[chunkhash:6].js',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2
    })
  ]
};
