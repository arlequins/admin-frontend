const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {PORT} = require('../scripts/envs')

module.exports = {
  mode: 'development',
  devServer: {
    static: './public', // boolean | string | array | object, static file location
    port: PORT,
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/template.html'
    }),
  ],
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
