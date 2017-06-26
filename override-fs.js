
const fs = require('fs');
const path = require('path');
const unionfs = require('unionfs');
const linkfs = require('./opt/linkfs');

const themeName = process.env.THEME;

const ReadStream = fs.ReadStream;
const WriteStream = fs.WriteStream;

function override(themeName) {
  const linkedfs = linkfs(fs, {
    [path.resolve('./src')]: path.resolve(`./themes/${themeName}`)
  });

  exports.linkedgs = linkedfs;

  unionfs
    .use(fs)
    .use(linkedfs)
    .replace(fs);

  fs.ReadStream.prototype = ReadStream.prototype;
  fs.WriteStream.prototype = WriteStream.prototype;
}

if (themeName) {
  override(themeName);
}

