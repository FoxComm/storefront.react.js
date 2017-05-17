## FoxCommerce Storefront React UI Library

Installation

```
yarn add @foxcomm/sf-react
```

Usage

At first you will need include storefront css located in 
`@foxcomm/sf-react/lib/bundle.css` to your project.

Later you can use storefront react components, like in this example:

```
import SelectBox from '@foxcomm/sf-react/lib/components/selectbox/selectbox';
//
// later in component:
render() {
  return <SelectBox items={items} value={value} onChange={handleChange} />;
}

```

