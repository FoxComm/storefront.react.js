/* @flow weak */

// libs
import React, { Component, Element } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { autobind } from 'core-decorators';

// components
import WaitAnimation from 'components/core/wait-animation/wait-animation';
import ActionLink from 'components/core/action-link';

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
  onLoadMoreReviews: (from: number) => Promise<mixed>,
  showLoadMore: ?boolean,
};

type State = {
  page: number,
};

type ReviewBodyProps = {
  title: string,
  userName: string,
  updatedAt: string,
  sku: string,
  body: string,
};

const ReviewBody = (props: ReviewBodyProps): Element<any> => {
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

class ProductReviewsList extends Component {

  props: Props;
  state: State = {
    page: 0,
  };

  get isEmptyContent(): boolean {
    const { listItems } = this.props;

    const activeReviews = _.filter(listItems, (review) => {
      return review.attributes.status.v == 'submitted';
    });

    return _.isEmpty(activeReviews);
  }

  get reviewsEmptyContentTitle(): ?Element<any> {
    const { listItems, emptyContentTitle } = this.props;

    return (
      <div styleName="product-reviews-subtitle">
        {emptyContentTitle}
      </div>
    );
  }

  get loadMoreActionsLink(): ?Element<any> {
    const { showLoadMore } = this.props;

    if (!showLoadMore) return null;

    return (
      <ActionLink
        action={this.handleLoadMoreReviews}
        title="LOAD MORE REVIEWS"
        styleName="product-review-load-more"
      />
    );
  }

  get displayReviews(): ?Element<any> {
    const { listItems, showLoadMore } = this.props;
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

    return (
      <div>
        {reviews}
        {this.loadMoreActionsLink}
      </div>
    );
  }

  @autobind
  handleLoadMoreReviews() {
    const { onLoadMoreReviews, paginationSize } = this.props;
    const { page } = this.state;

    const nextPage = page + 1;
    this.setState({page: nextPage});
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
        {this.isEmptyContent ? this.reviewsEmptyContentTitle : this.displayReviews}
      </div>
    );
  }
}

export default ProductReviewsList;
