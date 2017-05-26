
const postcss = require('postcss');
const Parser = require('css-modules-loader-core/lib/parser');
const FileSystemLoader = require('css-modules-loader-core/lib/file-system-loader');

const PLUGIN_NAME = 'css-modules-export';

function getLoader(opts, plugins) {
  const {root = '/'} = opts;
  return typeof opts.Loader === 'function'
    ? new opts.Loader(root, plugins)
    : new FileSystemLoader(root, plugins);
}

function noop(file, exportTokens) {
  return exportTokens;
}

module.exports = postcss.plugin(PLUGIN_NAME, (opts = {}) => {
  const { processTokens = noop } = opts;

  return (css, result) => {
    const inputFile = css.source.input.file;
    const plugins = result.processor.plugins.filter(plugin => plugin.postcssPlugin !== PLUGIN_NAME);

    const loader = getLoader(opts, plugins);
    const parser = new Parser(loader.fetch.bind(loader));

    return postcss([parser.plugin])
      .process(css, { from: inputFile })
      .then(() => {
        const out = loader.finalSource;
        if (out) css.prepend(out);

        return processTokens(inputFile, parser.exportTokens);
      });
  };
});