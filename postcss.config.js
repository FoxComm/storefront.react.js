
const path = require('path');
const fs = require('fs-extra');

// '../../src/components/select/select' + 'option' -> 'fc/select__option'
function generateScopedName(exportedName, filepath) {
  const sanitisedPath = path.relative(process.cwd(), filepath)
    .replace('src/components', '')
    .replace('src/css', '')
    .replace(/\.[^\.\/\\]+$/, '')
    .replace(/^[\.\/\\]+/, '')
    .replace(/\//g, '⁄');

  const sanitisedName = exportedName.replace(/^_+|_+$/g, '');

  return `fc_${sanitisedPath}__${sanitisedName}`;
}

function saveJSON(cssFile, json) {
  const libPath = path.relative(__dirname, cssFile).replace(/^src/, 'lib');

  return fs.ensureDir(path.dirname(libPath))
    .then(() => fs.writeJson(`${libPath}.json`, json))
    .then(() => json);
}

const plugins = [
  require('postcss-import')({
    path: ['src/css', 'node_modules'],
  }),
  require('postcss-assets')({
    loadPaths: ['src/images/']
  }),
  require('postcss-css-variables'),
  require('postcss-cssnext')({
    features: {
      // Instead of it we are using `postcss-css-variables` above
      // https://github.com/MadLittleMods/postcss-css-variables#differences-from-postcss-custom-properties
      customProperties: false,
    },
  }),
  require('postcss-nested'),
  require('postcss-modules')({
    generateScopedName,
    getJSON: saveJSON
  }),
];

exports.plugins = plugins;
