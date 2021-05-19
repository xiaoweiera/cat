/**
 * @file 翻译
 * @author svon.me@gmail.com
 */

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs'
  }
});

const Translate = require('./app');

const translate = new Translate();
translate.run();

