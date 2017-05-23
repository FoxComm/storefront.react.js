// @flow

import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import type { RoutesParams } from 'types/routes';

type Params = {
  productSlug: string,
};


const mapStateToProps = (state) => {
  const product = state.productDetails.product;
  const relatedProducts = state.crossSell.relatedProducts;

  return {
    product,
    relatedProducts,
    fetchError: _.get(state.asyncActions, 'pdp.err', null),
    notFound: !product && _.get(state.asyncActions, 'pdp.err.response.status') == 404,
    isLoading: _.get(state.asyncActions, ['pdp', 'inProgress'], true),
    isRelatedProductsLoading: _.get(state.asyncActions, ['relatedProducts', 'inProgress'], false),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetch,
    resetProduct,
    addLineItem,
    toggleCart,
    fetchRelatedProducts,
    clearRelatedProducts,
  }, dispatch),
});

export default class PdpConnect extends Component {
  productPromise: Promise<*>;

  componentWillMount() {
    if (_.isEmpty(this.props.product)) {
      this.productPromise = this.fetchProduct();
    } else {
      this.productPromise = Promise.resolve();
    }
  }

  componentDidMount() {
    this.productPromise.then(() => {
      const { product, isRelatedProductsLoading, actions } = this.props;
      tracking.viewDetails(this.productView);
      if (!isRelatedProductsLoading) {
        actions.fetchRelatedProducts(product.id, 1).catch(_.noop);
      }
    });
  }

  componentWillUnmount() {
    this.props.actions.resetProduct();
    this.props.actions.clearRelatedProducts();
  }

  componentWillUpdate(nextProps) {
    const nextId = this.getId(nextProps);

    if (this.productId !== nextId) {
      this.setState({ currentSku: null });
      this.props.actions.resetProduct();
      this.props.actions.clearRelatedProducts();
      this.fetchProduct(nextProps, nextId);
    }
  }

  @autobind
  getId(props): string|number {
    const slug = props.params.productSlug;

    if (/^\d+$/g.test(slug)) {
      return parseInt(slug, 10);
    }

    return slug;
  }

  get productId(): string|number {
    return this.getId(this.props);
  }

  isGiftCardRoute(props = this.props) {
    return props.route.name === 'gift-cards';
  }

  safeFetch(id) {
    return this.props.actions.fetch(id)
      .then((product) => {
        this.props.actions.fetchRelatedProducts(product.id, 1).catch(_.noop);
      })
      .catch(() => {
        const { params } = this.props;
        this.props.actions.fetch(params.productSlug)
          .then((product) => {
            this.props.actions.fetchRelatedProducts(product.id, 1).catch(_.noop);
          });
      });
  }

  fetchProduct(_props, _productId) {
    const props = _props || this.props;
    const productId = _productId || this.productId;

    if (this.isGiftCardRoute(props)) {
      return searchGiftCards().then(({ result = [] }) => {
        const giftCard = result[0] || {};
        return this.safeFetch(giftCard.productId);
      });
    }
    return this.safeFetch(productId);
  }
}