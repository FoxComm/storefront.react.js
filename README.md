## FoxCommerce Storefront React UI Library

Installation

```
yarn add @foxcomm/storefront-react
```

Following resources should be included in your project:

#### css styles
- `node_modules/@foxcomm/storefront-react/lib/bundle.css` css styles, include to your css bundle
- `node_modules/@foxcomm/storefront-react/lib/sprite.svg` svg icons bundled into the single sprite,
  should be included as is to the html


Usage

At first you will need include storefront css located in 
 to your project.

Later you can use storefront react components, like in this example:

```
import { SelectBox } from '@foxcomm/storefront-react';
//
// later in component:
render() {
  return <SelectBox items={items} value={value} onChange={handleChange} />;
}

```

You can optimize bundle size via `@foxcomm/storefront-react-optimize-imports` package.
See [README](./packages/storefront-react-optimize-imports/README.md) for details.
