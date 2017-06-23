const path = require('path');
const fs = require('fs');
const { camelCase, upperFirst } = require('lodash');

module.exports = {
  title: `FoxCommerce Storefront React UI Library`,
  template: path.join(__dirname, './styleguide/template.html'),
  showCode: false,
  assetsDir: path.resolve(__dirname, 'lib'),
  skipComponentsWithoutExample: false,
  webpackConfig: require('./styleguide/webpack.styleguide.js'),
  styleguideDir: path.resolve('public/styleguide'),
  getComponentPathLine: componentPath => {
    const dirname = path.dirname(componentPath, '.jsx');
    const name = dirname.split('/').slice(-1)[0];
    const componentName = upperFirst(camelCase(name));

    return `import { ${componentName} } from '@foxcomm/storefront-react';`;
  },
  context: {
    sampleProduct: path.resolve(__dirname, 'fixtures/sample-product.json'),
    sampleRelatedProducts: path.resolve(__dirname, 'fixtures/sample-related-products.json'),
    sampleProductReviews: path.resolve(__dirname, 'fixtures/sample-product-reviews.json'),
    sampleProductReviewsPending: path.resolve(__dirname, 'fixtures/sample-product-reviews-pending.json'),
    sampleOrder: path.resolve(__dirname, 'fixtures/order-placed.json'),
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
          components: () => [
            path.resolve(__dirname, 'src/components/core/buttons/button.jsx'),
            path.resolve(__dirname, 'src/components/core/buttons/secondary-button.jsx'),
          ],
        },
        {
          name: 'Icon',
          components: () => [path.resolve(__dirname, 'src/components/core/icon/icon.jsx')],
        },
        {
          name: 'Select',
          components: () => [path.resolve(__dirname, 'src/components/core/select/select.jsx')],
        },
      ],
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Pdp',
          components: () => [
            path.resolve(__dirname, 'src/components/pdp/pdp.jsx'),
            path.resolve(__dirname, 'src/components/related-products-list/related-products-list.jsx'),
            path.resolve(__dirname, 'src/components/product-reviews-list/product-reviews-list.jsx'),
          ],
        },
        {
          name: 'Order Summary',
          components: () => [
            path.resolve(__dirname, 'src/components/order-summary/totals.jsx'),
            path.resolve(__dirname, 'src/components/order-summary/order-summary.jsx'),
          ],
        },
      ],
    },
  ],
  require: [
    path.join(__dirname, 'src/css/reset.css'),
    path.join(__dirname, 'styleguide/styleguide.css'),
    path.join(__dirname, 'node_modules/react-image-gallery/styles/css/image-gallery.css'),
  ],
};
