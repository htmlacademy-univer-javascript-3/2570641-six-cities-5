import { Review } from '@/components/offer/review';
import { MAX_REVIEWS_COUNT } from '@/const';
import { Reviews } from '@/types/review';
import { memo, useMemo } from 'react';

type ReviewListProps = {
    reviews: Reviews;
}

function ReviewList({ reviews }: ReviewListProps) {

  const sortedReviews = useMemo(() => {
    if (!reviews) {
      return [];
    }
    return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_REVIEWS_COUNT);
  }, [reviews]);


  return (
    <ul className='reviews__list'>
      {sortedReviews.map((review) => (
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
