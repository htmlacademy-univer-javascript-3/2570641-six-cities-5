import { Comment } from '@/types/comment';

type ReviewProps = {
    comment: Comment;
}

export function Review({ comment }: ReviewProps) {
  const formattedDate = new Date(comment.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="User avatar"/>
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
        {comment.user.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `calc(100% / 5 * ${comment.rating})`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={comment.date}>{formattedDate}</time>
      </div>
    </li>
  );

}
