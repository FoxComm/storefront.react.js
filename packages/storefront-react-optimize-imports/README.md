# storefront-react-optimize-imports package

Transforms short import constructions like this:

```
import { Select, Pdp, Icon as FcIcon, OrderLineItems  } from '@foxcomm/storefront-react';
```

Into this:

```
import Select from "@foxcomm/storefront-react/lib/components/core/select/select";
import Pdp from "@foxcomm/storefront-react/lib/components/pdp/pdp";
import FcIcon from "@foxcomm/storefront-react/lib/components/core/icon/icon";
import OrderLineItems from "@foxcomm/storefront-react/lib/components/order-summary/product-table";
```

## Usage

Add `@foxcomm/storefront-react-optimize-imports` to plugins array in your `.babelrc` file:

```
{
  "plugins": [
    "@foxcomm/storefront-react-optimize-imports",
  ],
  "presets": ["flow", "stage-1", "es2015", "react"]
}

```