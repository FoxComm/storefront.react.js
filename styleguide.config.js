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
  context: {
    sampleProduct: path.resolve(__dirname, 'fixtures/sample-product.json'),
    sampleRelatedProducts: path.resolve(__dirname, 'fixtures/sample-related-products.json'),
    sampleProductReviews: path.resolve(__dirname, 'fixtures/sample-product-reviews.json'),
    sampleProductReviewsPending: path.resolve(__dirname, 'fixtures/sample-product-reviews-pending.json'),
  },
  sections: [
    {
      name: 'Styles',
      content: 'docs/styles.md',
    },
    {
      name: 'Components/Core',
      sections: [
        {
          name: 'Buttons',
          components: () => ([
            path.resolve(__dirname, 'src/components/core/buttons/button.jsx'),
            path.resolve(__dirname, 'src/components/core/buttons/secondary-button.jsx')
          ]),
        },
      ],
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Pdp',
          components: () => ([
            path.resolve(__dirname, 'src/components/pdp/pdp.jsx'),
            path.resolve(__dirname, 'src/components/related-products-list/related-products-list.jsx'),
            path.resolve(__dirname, 'src/components/product-reviews-list/product-reviews-list.jsx'),
          ]),
        },
      ],
    },
  ],
  require: [
    path.join(__dirname, 'src/css/reset.css'),
    path.join(__dirname, 'styleguide/styleguide.css'),
    path.join(__dirname, 'node_modules/react-image-gallery/styles/css/image-gallery.css'),
  ]
};
