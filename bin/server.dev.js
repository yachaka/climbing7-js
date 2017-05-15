
const once = require('ramda').once;
const nodemon = require('nodemon');
const webpack = require('webpack');
const path = require('path');
const webpackServerConfig = require('../webpack.server.config');

const compiler = webpack(webpackServerConfig);

const startServer = () => {
  const serverPaths = Object
    .keys(compiler.options.entry)
    .map(entry => path.join(compiler.options.output.path, `${entry}.js`));

  nodemon({ script: serverPaths[0], watch: serverPaths })
    .on('quit', process.exit);
};

const startServerOnce = once((err, stats) => {
  if (err) {
    console.log(err);
    return;
  }
  startServer();
});


const watcher = compiler.watch({}, startServerOnce);

process.on('SIGINT', () => {
  watcher.close();
  process.exit();
});
