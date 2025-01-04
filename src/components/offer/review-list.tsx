import { Review } from '@/components/offer/review';
import { Reviews } from '@/types/review';
import { memo } from 'react';

type ReviewListProps = {
    reviews: Reviews;
}

function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className='reviews__list'>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}


const MemoizedReviewsList = memo(
  ReviewList,
  (prevProps, nextProps) => prevProps.reviews.map((review) => review.id).join() === nextProps.reviews.map((review) => review.id).join()
);
export default MemoizedReviewsList;
