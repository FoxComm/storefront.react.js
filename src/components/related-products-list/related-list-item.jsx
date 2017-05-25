/* @flow */

import _ from 'lodash';
import React, { Element } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './related-list-item.css';
import { autobind } from 'core-decorators';
import * as tracking from 'lib/analytics';

import { Link } from 'react-router';
import ProductImage from 'components/product-image/product-image';

import type { Product } from '@foxcomm/api-js/types/api/views/product';

type State = {
  error?: any,
};

type Props = {
  product: Product,
  index: number,
  imgixProductsSource: string,
  s3BucketName: string,
  s3BucketPrefix: string,
}

class RelatedListItem extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    skus: [],
  };

  get image(): Element<any> {
    const { props } = this;
    const previewImageUrl = _.get(props.product.albums, ['0', 'images', '0', 'src']);

    return (
      <ProductImage
        src={previewImageUrl}
        styleName="preview-image"
        ref="image"
        imgixProductsSource={props.imgixProductsSource}
        s3BucketName={props.s3BucketName}
        s3BucketPrefix={props.s3BucketPrefix}
      />
    );
  }

  getImageNode() {
    return findDOMNode(this.refs.image);
  }

  @autobind
  handleClick() {
    const { props } = this;

    tracking.clickPdp(props.product, props.index);
  }

  getCollection() {
    const collectionTaxonomy = _.find(this.props.product.taxonomies, (taxonomyEntity) => {
      return taxonomyEntity.taxonomy === 'collection';
    });

    return _.get(collectionTaxonomy, ['taxons', '0', '0'], '');
  }

  render() {
    const {
      productId,
      slug,
      title,
    } = this.props.product;

    const productSlug = slug != null && !_.isEmpty(slug) ? slug : productId;
    const collection = this.getCollection();

    return (
      <div styleName="list-item">
        <Link styleName="link" onClick={this.handleClick} to={`/products/${productSlug}`}>
          <div styleName="overlay" />
          <div styleName="preview">
            {this.image}
          </div>
        </Link>

        <div styleName="text-block">
          <h1 styleName="collection" alt={collection}>
            <Link to={`/products/${productSlug}`}>{collection}</Link>
          </h1>
          <h1 styleName="title" alt={title}>
            <Link to={`/products/${productSlug}`}>{title}</Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default RelatedListItem;
