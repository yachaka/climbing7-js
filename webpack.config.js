
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    path.resolve(__dirname, 'src/client/index.js'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: "css-loader",
      //         options: {
      //           modules: true,
      //         },
      //       }
      //     ],
      //   }),
      // }
    ]
  },

  // plugins: [
  //   new ExtractTextPlugin("bundle.css"),
  // ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
};
