
const once = require('ramda').once;
const nodemon = require('nodemon');
const webpack = require('webpack');
const path = require('path');
const webpackClientConfig = require('../webpack.config');

const compiler = webpack(webpackClientConfig);

const watcher = compiler.watch({}, (err, stats) => {
  const now = new Date();
  const timeString = `[${now.getHours()}h ${now.getMinutes()}m ${now.getSeconds()}s]`;
  console.log(`${timeString} Bundle Recompiled`);
});

process.on('SIGINT', () => {
  watcher.close();
  process.exit();
});