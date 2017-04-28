var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var GlobalizePlugin = require('globalize-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    main: './app.js',
    vendor: [
      'globalize',
      'globalize/dist/globalize-runtime/number',
      'globalize/dist/globalize-runtime/currency',
      'globalize/dist/globalize-runtime/date',
      'globalize/dist/globalize-runtime/message',
      'globalize/dist/globalize-runtime/plural',
      'globalize/dist/globalize-runtime/relative-time',
      'globalize/dist/globalize-runtime/unit'
    ]
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      production: true,
      template: './index-template.html'
    }),
    new GlobalizePlugin({
      production: true,
      developmentLocale: 'en',
      supportedLocales: ['ar', 'en'],
      messages: 'messages/[locale].json',
      output: 'i18n/[locale].[hash].js'
    }),
    new CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      filename: '[name].[hash].js',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'shared',
      children: true,
      minChunks: 2
    })
  ]
};
