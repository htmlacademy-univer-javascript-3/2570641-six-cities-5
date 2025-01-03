import Logo from '@/components/header/logo';
import HeaderNav from '@/components/header/header';
import { Helmet } from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import ReviewForm from '@/components/offer/review-form';
import NotFoundScreen from '@/pages/not-found/not-found-page';
import { ReviewList } from '@/components/offer/review-list';
import Map from '@/components/map/map';
import { NearbyList } from '@/components/cards/nearby-list';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { useEffect } from 'react';
import { fetchOneOfferAction } from '@/store/api';
import SpinnerPage from '../spinner/spinner-page';
import { AuthorizationStatus } from '@/const';

export default function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const stateOffer = useAppSelector((state) => state.offer);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneOfferAction({ id }));
    }
  }, [id, dispatch]);

  if (stateOffer === undefined) {
    return <SpinnerPage />;
  }

  if (stateOffer === null) {
    return <NotFoundScreen />;
  }

  const { offer, nearbyOffers, reviews } = stateOffer;

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer {offer.id}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `calc(100% / 5 * ${offer.rating})`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                      Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                      3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                      Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                        Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                        Washing machine
                  </li>
                  <li className="offer__inside-item">
                        Towels
                  </li>
                  <li className="offer__inside-item">
                        Heating
                  </li>
                  <li className="offer__inside-item">
                        Coffee machine
                  </li>
                  <li className="offer__inside-item">
                        Baby seat
                  </li>
                  <li className="offer__inside-item">
                        Kitchen
                  </li>
                  <li className="offer__inside-item">
                        Dishwasher
                  </li>
                  <li className="offer__inside-item">
                        Cabel TV
                  </li>
                  <li className="offer__inside-item">
                        Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                        Angelina
                  </span>
                  <span className="offer__user-status">
                        Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                        An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              location={offer.city.location}
              offers={nearbyOffers}
              selectedOffer={offer}
            />
          </section>
        </section>
        <NearbyList offers={nearbyOffers}></NearbyList>
      </main>
    </div>
  );
}
