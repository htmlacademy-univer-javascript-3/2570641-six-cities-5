import {Offer} from '@/types/offer';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchFavorites, fetchOffersAction, sendChangeFavoritesStatusAction } from '@/store/api';
import { getAuthorizationStatus } from '@/store/user-process/selectors';

type PlaceCardProps = {
  offer: Offer;
}


export default function PlaceCard({offer}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handleChangeFavoriteStatus = (currentOffer: Offer) => {
    if (authorizationStatus !== AuthorizationStatus.Auth){
      navigate(AppRoute.Login);
    }else{
      dispatch(sendChangeFavoritesStatusAction(currentOffer)).then(() => {
        dispatch(fetchOffersAction());
        dispatch(fetchFavorites());
      });
    }
  };

  return (
    <article className="cities__card place-card">
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className="place-card__price-value">&euro;{offer.price}</b>            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${offer.isFavorite && 'place-card__bookmark-button--active'} button`} type="button" onClick={() => handleChangeFavoriteStatus(offer)}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: `calc(100% / 5 * ${offer.rating})`}}></span>            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type[0].toUpperCase() + offer.type.substring(1)}</p>
      </div>
    </article>
  );
}
