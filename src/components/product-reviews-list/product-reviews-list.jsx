/* @flow weak */

// libs
import React, { Component, Element } from 'react';
import _ from 'lodash';
import moment from 'moment';

// components
import WaitAnimation from 'components/core/wait-animation/wait-animation';
import ActionLink from 'components/core/action-link/action-link';

// styles
import styles from './product-reviews-list.css';

// types
type ReviewAttributes = {
  title: {t:'string', v: string},
  body: {t:'string', v: string},
  status: {t: 'string', v: string},
}

type ReviewItem = {
  sku: string,
  id: number,
  scope: string,
  createdAt: string,
  updatedAt: string,
  archivedAt: ?string,
  userName: string,
  attributes: ReviewAttributes,
}

type Props = {
  isLoading: ?boolean,
  listItems: ?Array<ReviewItem>,
  title: string,
  emptyContentTitle: string,
  paginationSize: number,
  onLoadMoreReviews: Function,
  showLoadMore: ?boolean
};

type State = {
  page: number,
}

const ReviewBody = (props): Element<any> => {
  const { title, userName, updatedAt, sku, body } = props;
  const updatedAtFormatted = moment(updatedAt).format('MMM Do YYYY');

  return (
    <div styleName="product-review-container">
      <div styleName="product-review-content">
        <div styleName="product-review-title">
          {title}
        </div>
        <div styleName="product-review-name-date">
          From: {userName} on {updatedAtFormatted}
        </div>
        <div styleName="product-review-variant">
          SKU: {sku}
        </div>
        <div styleName="product-review-body">
          {body}
        </div>
        <div styleName="product-review-flag">
          <ActionLink
            action={_.noop}
            title="Report Offensive Review"
            styleName="product-review-report-offense"
          />
        </div>
      </div>
    </div>
  );
};

function incrementPage(nextPage) {
  return { page: nextPage };
}

class ProductReviewsList extends Component {

  props: Props;
  state: State = {
    page: 0,
  };

  get reviewsEmptyContentTitle(): ?Element<any> {
    const { listItems, emptyContentTitle } = this.props;

    if (_.isEmpty(listItems)) {
      return (
        <div styleName="product-reviews-subtitle">
          {emptyContentTitle}
        </div>
      );
    }
    return null;
  }

  get displayReviews(): ?Element<any> {
    const { listItems, showLoadMore } = this.props;
    const activeReviews = _.filter(listItems, (review) => {
      return review.attributes.status.v == 'submitted';
    });
    if (!_.isEmpty(activeReviews)) {
      const reviews = _.map(listItems, (review) => {
        return (
          <ReviewBody
            key={review.id}
            title={review.attributes.title.v}
            userName={review.userName}
            updatedAt={review.updatedAt}
            sku={review.sku}
            body={review.attributes.body.v}
          />
        );
      });

      const loadMoreActionLink = (showLoadMore)
      ? (
        <ActionLink
          action={this.handleLoadMoreReviews}
          title="LOAD MORE REVIEWS"
          styleName="product-review-load-more"
        />
      )
      : null;

      return (
        <div>
          {reviews}
          {loadMoreActionLink}
        </div>
      );
    }
    return null;
  }

  handleLoadMoreReviews = () => {
    const { onLoadMoreReviews, paginationSize } = this.props;
    const { page } = this.state;

    const nextPage = page + 1;
    this.setState(incrementPage(nextPage));
    onLoadMoreReviews(paginationSize * nextPage);
  }

  render(): Element<any> {
    const { title, isLoading } = this.props;

    if (isLoading) {
      return <WaitAnimation />;
    }

    return (
      <div styleName="product-reviews-list-wrapper">
        <div styleName="product-reviews-title">
          {title}
        </div>
        {this.reviewsEmptyContentTitle}
        {this.displayReviews}
      </div>
    );
  }
}

export default ProductReviewsList;
