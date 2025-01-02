import { Comments } from '@/types/comment';
import { Review } from '@/components/offer/review';

type ReviewListProps = {
    comments: Comments;
}

export function ReviewList({ comments }: ReviewListProps) {
  return (
    <ul className='reviews__list'>
      {comments.map((comment) => (
        <Review key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
