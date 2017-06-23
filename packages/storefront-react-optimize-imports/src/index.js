'use strict';

/* eslint new-cap: 0, dot-notation: 0, no-param-reassign: 0 */

exports.__esModule = true;

const corePackage = [
  'Accordion',
  'ActionLink',
  ['ErrorAlerts', 'alerts/error-alerts'],
  'Autocomplete',
  ['Button', 'buttons/button'],
  ['SecondaryButton', 'buttons/secondary-button'],
  'Checkbox',
  'Currency',
  'EditableBlock',
  'Facets',
  'Filters',
  ['Form', 'forms/form'],
  ['FormField', 'forms/formfield'],
  ['Counter', 'forms/counter'],
  'Gallery',
  ['GoogleConversion', 'google/conversion'],
  'Icon',
  'Modal',
  'Overlay',
  ['RadioButton', 'radiobutton/radiobutton'],
  'Select',
  ['SelectBox', 'selectbox/selectbox'],
  'TermValueLine',
  'TextInput',
  ['TextArea', 'textarea/textarea'],
  'WaitAnimation',
  'WrapToLines',
];

const baseComponents = {
  'ImagePlaceholder': 'product-image/image-placeholder',
  'OrderTotals': 'order-summary/totals',
  'OrderLineItems': 'order-summary/product-table',
};

function kebabCase(str) {
  return str.replace(/([A-Z])/g, (a, m, i) => `-${m.toLowerCase()}`).substr(1);
}

const coreIndexed = corePackage.reduce((acc, value) => {
  if (typeof value == 'string') {
    const kebabName = kebabCase(value);
    acc[value] = `core/${kebabName}/${kebabName}`;
  } else {
    acc[value[0]] = `core/${value[1]}`;
  }
  return acc;
}, {});
const components = Object.assign({}, baseComponents, coreIndexed);

const pkgName = '@foxcomm/storefront-react';

exports['default'] = function (_ref) {
  const t = _ref.types;

  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        if (node.source.value == pkgName) {
          const newImports = node.specifiers.map(decl => {
            const name = decl.imported.name;
            const kebabName = kebabCase(name);

            const importPath = components[name] || `${kebabName}/${kebabName}`;
            const finalPath = `${pkgName}/lib/components/${importPath}`;

            const source = t.stringLiteral(finalPath);
            const specifier = t.importDefaultSpecifier(t.identifier(decl.local.name));

            return t.importDeclaration([specifier], source);
          });
          path.replaceWithMultiple(newImports);
        }
      }
    },
  };
};

module.exports = exports['default'];
