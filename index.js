/* eslint-disable */
const pkg = require('./package.json');
const main = require('./dist/index');
const run = main.prepare(pkg);

run();
