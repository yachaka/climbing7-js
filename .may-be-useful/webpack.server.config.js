
const path = require('path');
const mergeWith = require('lodash.mergewith');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');

const mergeAndConcatCustomizer = function (a, b) {
  return (Array.isArray(a) && Array.isArray(b))
    ? a.concat(b)
    : undefined;
}

module.exports = mergeWith(baseConfig, {
  entry: {
    server: path.resolve(__dirname, 'server/index.js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: "css-loader",
          options: {
            modules: true,
          },
        }],
      }
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
}, mergeAndConcatCustomizer);
