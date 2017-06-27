
const through = require('through2');
const fs = require('fs');
const path = require('path');
const vinylFile = require('vinyl-file');

const themeName = process.env.THEME || 'peacock';
exports.name = themeName;

const rewrites = {
  [path.resolve('./src')]: path.resolve(`./themes/${themeName}`),
};

function overridePaths(options = {overrideOnlyContent: false}) {
  return through.obj((file, enc, cb) => {
    for (let from in rewrites) {
      if (file.path.indexOf(from) === 0) {
        const newPath = file.path.replace(from, rewrites[from]);
        if (fs.existsSync(newPath)) {
          console.info(`override ${file.path} -> ${newPath}`);
          if (options.overrideOnlyContent) {
            file.contents = fs.readFileSync(newPath);
          } else {
            file = vinylFile.readSync(newPath, {
              base: rewrites[from],
            });
          }
          break;
        }
      }
    }
    cb(null, file);
  });
}

exports.overridePaths = overridePaths;