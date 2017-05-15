
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'client'),
          path.resolve(__dirname, 'server'),
        ],
        loader: "babel-loader",
      }
    ],
  },

  output: {
    path: path.resolve(__dirname + '/build'),
  },
};
