/**
 * @file 翻译
 * @author svon.me@gmail.com
 */

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const process = require('child_process');
const safeSet = require('@fengqiaogang/safe-set');
const safeGet = require('@fengqiaogang/safe-get');
// 百度翻译
const BaiduTranslate = require('@fengqiaogang/translate');
// 获取项目跟目录下的配置文件
const getConfig = require('@fengqiaogang/config').default;

const translate = new BaiduTranslate.Translate('20210223000704920', 'D6JBvA6BTsTncumlIOui');

class Translate {
  constructor() {
    const config = getConfig('kiwi-config.json');
    // 获取国际化文案目录
    const kiwiDir = safeGet(config, 'kiwiDir') || 'langs';
    // 判断目录是否为绝对路径
    if (path.isAbsolute(kiwiDir)) {
      this.kiwiDir = path.normalize(kiwiDir);
    } else {
      this.kiwiDir = path.normalize(path.join(__dirname, '../..', kiwiDir));
    }
    // 以什么语言为基准，根据该语言翻译其它语言
    const srcLang = safeGet(config, 'srcLang');
    this.srcLang = srcLang || 'zh_CN'; // 默认中文
    // 需要翻译的目标语言
    const distLangs = safeGet(config, 'distLangs');
    if (distLangs) {
      this.distLangs = [].concat(distLangs);
    } else {
      this.distLangs = ['en-US']; // 默认英文
    }
  }
  // 获取语言文案目录
  getLangDir(lang) {
    // 根据语言类型拼接目录
    return path.resolve(this.kiwiDir, lang);
  }
  // 根据指定的语言类型，生成对应的其它语言文件
  copyFiles () {
    _.each(this.distLangs, (lang) => {
      const src = this.getLangDir(lang)
      // 创建目录
      process.exec(`mkdir -p ${src}`);
      // 复制文件
      process.exec(`cp ${this.getLangDir(this.srcLang)}/index.ts ${src}/index.ts`);
    })
  }
  /**
   * 深度优先遍历对象中的所有 string 属性，即文案
   */
  traverse (obj, cb) {
    function traverseInner(obj, cb, path) {
      _.forEach(obj, (val, key) => {
        if (_.isString(val)) {
          cb(val, [...path, key].join('.'));
        } else if (val && _.isObject(val)) {
          traverseInner(val, cb, [...path, key]);
        }
      });
    }
    traverseInner(obj, cb, []);
  }
  // 获取需要翻译的所有文件
  getFiles () {
    const src = this.getLangDir(this.srcLang);
    return new Promise(function(resolve, reject) {
      fs.readdir(src, function(error, files) {
        if (error) {
          return reject(error)
        }
        const array = _.filter(files, function(name) {
          if (name === 'index.ts') {
            return false
          }
          return true
        })
        return resolve(array);
      })
    })
  }
  async makeMessage(lang, file) {
    const source = path.join(this.getLangDir(lang), file);
    const target = path.join(this.getLangDir(this.srcLang), file);
    const module = require(target);
    const content = module.default ? module.default : module;
    const texts = {}
    this.traverse(content, (text, key) => {
      texts[key] = text;
    })
    return {
      type: lang,
      source: {
        dir: source,
        texts: {}
      },
      target: {
        dir: target,
        texts: texts
      }
    };
  }
  // 文案纠正，主要处理 val1 变成了 Val1
  textCorrect (text) {
    if (text && _.isString(text)) {
      // 根据规则匹配出需要宏替换的文案
      const content = text.replace(/{([\w]+)}/g,function(str, key){
        // 把字母转换为小写
        const value = _.toLower(key);
        return `{${value}}`;
      });
      return content;
    }
    return text || '';
  }
  // 转换语言枚举值
  getLangType (type) {
    if (type === 'cn') {
      return BaiduTranslate.Language.zh;
    }
    return type;
  }
  makeMessageTask(result) {
    // 文案修正
    const callback = (value) => {
      return this.textCorrect(value);
    }
    const tasks = []
    _.each(result, (item) => {
      _.each(item.target.texts, (value, key) => {
        const to = this.getLangType(item.type); // 目标语言类型
        const from = this.getLangType(this.srcLang); // 需要翻译的语言类型
        const message = async function() {
          // 调用百度翻译
          const data = await translate.get(value, to, from);
          const list = safeGet(data, 'trans_result') || [];
          let text = safeGet([].concat(list), '[0].dst') || '';
          text = callback(text);
          safeSet(item.source.texts, key, text);
          console.log(`type = "${to}" --- from = "${value}" --= to = "${text}"`);
          return true;
        }
        tasks.push(message());
      });
    });
    return Promise.all(tasks);
  }
  writeMessage (item) {
    const content = JSON.stringify(item.source.texts, null, 2);
    const code = `export default ${content}`;
    const log = `${item.type}=${item.source.dir}\n${code}`;
    return new Promise((resolve, reject) => {
      fs.writeFile(item.source.dir, code, err => {
        if (err) {
          reject(err);
        } else {
          resolve(log);
        }
      });
    });
  }
  async run () {
    // 生成语言文件
    this.copyFiles();
    const files = await this.getFiles();
    const messages = [];
    _.each(files, (name) => {
      _.each(this.distLangs, (lang) => {
        messages.push(this.makeMessage(lang, name))
      });
    });
    const result = await Promise.all(messages);
    // 调用翻译工具
    await this.makeMessageTask(result);
    // 文件写入
    try {
      await Promise.all(_.map(result, item => this.writeMessage(item)));
      console.log('success');
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Translate
