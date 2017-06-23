const path = require('path');
const fs = require('fs-extra');

const seenPaths = Object.create(null);

// '../../src/components/select/select' + 'option' -> 'fc/select__option'
function generateScopedName(exportedName, filepath) {
  const filepathRelative = path.relative(process.cwd(), filepath);
  const sanitisedPath = filepathRelative
    .replace('src/components', '')
    .replace('src/css', '')
    .replace(/\.[^\.\/\\]+$/, '')
    .replace(/^[\.\/\\]+/, '');

  const finalPath = path.basename(sanitisedPath).replace(/\//g, '⁄');
  if (finalPath in seenPaths) {
    if (seenPaths[finalPath] != filepathRelative) {
      throw new Error(
        `Couldn't use ${filepathRelative} in order to there is already file with same basename: ${seenPaths[finalPath]}`
      );
    }
  } else {
    seenPaths[finalPath] = filepathRelative;
  }
  const sanitisedName = exportedName.replace(/^_+|_+$/g, '');

  return `fc-${finalPath}__${sanitisedName}`;
}

const plugins = [
  require('postcss-import')({
    path: ['src/css', 'node_modules'],
  }),
  require('postcss-assets')({
    loadPaths: ['src/images/'],
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
  require('postcss-modules-local-by-default'),
  require('postcss-modules-scope')({
    generateScopedName,
  }),
];

exports.plugins = plugins;
exports.generateScopedName = generateScopedName;
