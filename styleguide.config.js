const path = require('path');
const { camelCase, upperFirst } = require('lodash');

module.exports = {
  title: `FoxCommerce Storefront React UI Library`,
  template: path.join(__dirname, './styleguide/template.html'),
  showCode: false,
  skipComponentsWithoutExample: false,
  webpackConfig: require('./styleguide/webpack.styleguide.js'),
  styleguideDir: path.resolve('public/styleguide'),
  getComponentPathLine: (componentPath) => {
    const dirname = path.dirname(componentPath, '.jsx');
    const name = dirname.split('/').slice(-1)[0];
    const componentName = upperFirst(camelCase(name));

    const importPath = dirname.split(/\/src\//).pop();

    return `import ${componentName} from ${importPath}`;
  },
  sections: [
    {
      name: 'Styles',
      content: 'docs/styles.md',
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Buttons',
          components: () => ([
            path.resolve(__dirname, 'src/components/buttons/button.jsx'),
            path.resolve(__dirname, 'src/components/buttons/secondary-button.jsx')
          ]),
        },
      ],
    },
  ],
  require: [
    path.join(__dirname, 'styleguide/styleguide.css'),
  ]
};
