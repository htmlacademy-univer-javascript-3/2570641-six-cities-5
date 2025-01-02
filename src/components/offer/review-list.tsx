import { Review } from '@/components/offer/review';
import { Reviews } from '@/types/review';

type ReviewListProps = {
    reviews: Reviews;
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className='reviews__list'>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}
