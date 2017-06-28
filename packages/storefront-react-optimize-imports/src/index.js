'use strict';
/* eslint new-cap: 0, dot-notation: 0, no-param-reassign: 0 */

exports = module.exports = plugin;
exports['default'] = plugin;
exports.__esModule = true;

const { parse } = require('babylon');
const path = require('path');
const fs = require('fs');
const findUp = require('find-up');
const traverse = require('babel-traverse').default;

const pkgName = '@foxcomm/storefront-react';

const parentPackagePath = findUp.sync('package.json', {
  cwd: path.resolve(__dirname, '../../')
});

if (!parentPackagePath) {
  throw new Error('Could\'nt find parent root package');
}
let importsEntrypoint;

const rootPackage = require(parentPackagePath);
if (rootPackage.name === pkgName) {
  importsEntrypoint = path.join(path.dirname(parentPackagePath), 'src/index.js');
} else {
  importsEntrypoint = path.join(path.dirname(parentPackagePath), 'node_modules', pkgName, 'exports.js');
}

const importsCode = fs.readFileSync(importsEntrypoint).toString();
const importsAst = parse(importsCode, {
  sourceType: 'module',
  plugins: [
    'exportExtensions'
  ]
});

function transformToComponents(importsAst) {
  const components = Object.create(null);
  traverse(importsAst, {
    ExportNamedDeclaration(path) {
      const { node } = path;
      node.specifiers.forEach(spec => {
        let entry = {
          isDefault: spec.type === 'ExportDefaultSpecifier',
          path: node.source.value.substr(1),
        };
        if (!entry.isDefault) {
          entry.localName = spec.local.name;
        }
        components[spec.exported.name] = entry;
      });
    }
  });
  return components;
}

const components = transformToComponents(importsAst);
exports.components = components;

const pkgRe = /^\@foxcomm\/storefront-react\/[^\/]+$/;

function plugin(_ref) {
  const t = _ref.types;

  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        if (pkgRe.test(node.source.value)) {
          const newImports = node.specifiers.map(decl => {
            const name = decl.imported.name;
            if (name in components) {
              const entry = components[name];
              const source = t.stringLiteral(`${node.source.value}${entry.path}`);
              let specifier;
              if (entry.isDefault) {
                specifier = t.importDefaultSpecifier(t.identifier(decl.local.name));
              } else {
                specifier = t.importSpecifier(t.identifier(decl.local.name), t.identifier(entry.localName));
              }
              return t.importDeclaration([specifier], source);
            } else {
              // unknown declaration, re-import as is
              return t.importDeclaration([
                t.importSpecifier(t.identifier(decl.local.name), t.identifier(decl.imported.name))
              ], t.stringLiteral(node.source.value));
            }
          });
          path.replaceWithMultiple(newImports);
        }
      }
    },
  };
}
