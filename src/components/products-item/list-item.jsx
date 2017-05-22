/* @flow */

import _ from 'lodash';
import React, { Element } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './list-item.css';
import { Link } from 'react-router';
import { autobind } from 'core-decorators';
import * as tracking from 'lib/analytics';

import Currency from 'components/core/currency/currency';
import ImagePlaceholder from './image-placeholder';
import ProductImage from 'components/core/image/image';

import type { Product } from 'types/api/views/product';

type State = {
  error?: any,
};

type Props = {
  product: Product,
  index: number,
}

export default class ListItem extends React.Component {
  props: Props;
  state: State;

  get image() {
    const previewImageUrl = _.get(this.props.product.albums, [0, 'images', 0, 'src']);

    return previewImageUrl
      ? <ProductImage src={previewImageUrl} styleName="preview-image" ref="image" width={300} height={300} />
      : <ImagePlaceholder ref="image" />;
  }

  getImageNode() {
    return findDOMNode(this.refs.image);
  }

  @autobind
  handleClick() {
    const { props } = this;

    tracking.clickPdp(props.product, props.index);
  }

  isOnSale(): Element<*> {
    const { currency } = this.props.product;

    let {
      salePrice,
      retailPrice,
    } = this.props.product;

    salePrice = Number(salePrice);
    retailPrice = Number(retailPrice);

    return (retailPrice > salePrice) ? (
      <div styleName="price">
        <Currency
          styleName="retail-price"
          value={retailPrice}
          currency={currency}
        />
        <Currency
          styleName="on-sale-price"
          value={salePrice}
          currency={currency}
        />
      </div>
      ) : (
        <div styleName="price">
          <Currency value={salePrice} currency={currency} />
        </div>
      );
  }

  render(): Element<*> {
    const {
      productId,
      slug,
      title,
    } = this.props.product;

    const productSlug = slug != null && !_.isEmpty(slug) ? slug : productId;

    return (
      <div styleName="list-item">
        <Link styleName="link" onClick={this.handleClick} to={`/products/${productSlug}`}>
          <div styleName="preview">
            {this.image}
          </div>

          <div styleName="text-block">
            <div styleName="title-line">
              <h1 styleName="title" alt={title}>
                {title}
              </h1>
            </div>
            <div styleName="price-line">
              {this.isOnSale()}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
