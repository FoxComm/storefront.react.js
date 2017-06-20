// @flow

import React from 'react';
import ImagePlaceholder from './image-placeholder';
import BaseProductImage from '@foxcomm/wings/lib/ui/imgix/product-image';

type Props = {
  imgixProductsSource: string,
  s3BucketName: string,
  s3BucketPrefix: string,
  src: ?string,
  className?: string,
  width?: number,
  height?: number,
};

export default class ProductImage extends React.Component {
  props: Props;

  render() {
    if (!this.props.src) {
      return <ImagePlaceholder />;
    }

    return <BaseProductImage {...this.props} />;
  }
}
