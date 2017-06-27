const path = require('path');
const fs = require('fs');
const _ = require('lodash');


const methods = [
  'rename',
  'renameSync',
  'truncate',
  'truncateSync',
  'chown',
  'chownSync',
  'lchown',
  'lchownSync',
  'chmod',
  'chmodSync',
  'lchmod',
  'lchmodSync',
  'stat',
  'lstat',
  'statSync',
  'lstatSync',
  'link',
  'linkSync',
  'symlink',
  'symlinkSync',
  'readlink',
  'readlinkSync',
  'realpath',
  'realpathSync',
  'unlink',
  'unlinkSync',
  'rmdir',
  'rmdirSync',
  'mkdir',
  'mkdirSync',
  'readdir',
  'readdirSync',
  'open',
  'openSync',
  'utimes',
  'utimesSync',
  'readFile',
  'readFileSync',
  'writeFile',
  'writeFileSync',
  'appendFile',
  'appendFileSync',
  'watchFile',
  'unwatchFile',
  'watch',
  'exists',
  'existsSync',
  'access',
  'accessSync',
  'createReadStream',
  'createWriteStream'
];

const originalFs = fs;
const existsSync = fs.existsSync;

function linkfs(fs, rewrites, finalMethods = methods) {
  const resolvedRewrites = Object.create(null);
  _.each(rewrites, (value, from) => {
    resolvedRewrites[path.resolve(from)] = path.resolve(value);
  });

  // Rewrite the path of the selected methods.
  const linkedfs = {};
  _.each(finalMethods, method => {
    const func = fs[method];
    linkedfs[method] = function(filepath, ...args) {
      filepath = path.resolve(filepath);

      for (let from in resolvedRewrites) {
        if (filepath.indexOf(from) === 0) {
          const newPath = filepath.replace(from, resolvedRewrites[from]);
          if (existsSync.call(originalFs, newPath)) {
            filepath = newPath;
            break;
          }
        }
      }

      return func.call(fs, filepath, ...args);
    };
  });

  // Just proxy the rest of the methods
  for (let method in fs) {
    const func = fs[method];
    if ((typeof func == 'function') && !linkedfs[method]) {
      linkedfs[method] = fs[method].bind(fs);
    }
  }

  return linkedfs;
}


module.exports = linkfs;