#### Example

##### Sample reviews

```
<div style={{maxWidth: '1080px'}}>
  <ProductReviewsList
    title="Reviews"
    emptyContentTitle="There are no reviews for this product"
    listItems={sampleProductReviews.result}
    isLoading={false}
    paginationSize={5}
    onLoadMoreReviews={()=>{alert('load more')}}
    showLoadMore={_.size(sampleProductReviews.result) < sampleProductReviews.pagination.total}
  />
</div>
```
##### No reviews or only pending reviews

```
<div style={{maxWidth: '1080px'}}>
  <ProductReviewsList
    title="Reviews"
    emptyContentTitle="There are no reviews for this product"
    listItems={sampleProductReviewsPending.result}
    isLoading={false}
    paginationSize={5}
    onLoadMoreReviews={()=>{alert('load more')}}
    showLoadMore={_.size(sampleProductReviewsPending.result) < sampleProductReviewsPending.pagination.total}
  />
</div>
```
