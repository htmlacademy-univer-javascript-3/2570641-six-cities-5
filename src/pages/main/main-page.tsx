import OffersList from '@/components/cards/card-list';
import {Offers} from '@/types/offer';
import Map from '@/components/map/map';
import {useState, useEffect} from 'react';
import CitiesList from '@/components/map/cities-list';
import { CITIES } from '@/const';
import { useAppSelector } from '@/hooks/index';


export default function MainPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);

  const [currentCityOffers, setCurrentCityOffers] = useState<Offers>(offers);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const selectedOffer = offers.find((offer) => offer.id === activeOfferId);

  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    setCurrentCityOffers(filteredOffers);
  }, [city, offers]);

  return (
    <>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>6 cities</title>
      <link rel='stylesheet' href='css/main.css' />

      <div className='page page--gray page--main'>
        <header className='header'>
          <div className='container'>
            <div className='header__wrapper'>
              <div className='header__left'>
                <a className='header__logo-link header__logo-link--active'>
                  <img
                    className='header__logo'
                    src='img/logo.svg'
                    alt='6 cities logo'
                    width='81'
                    height='41'
                  />
                </a>
              </div>
              <nav className='header__nav'>
                <ul className='header__nav-list'>
                  <li className='header__nav-item user'>
                    <a
                      className='header__nav-link header__nav-link--profile'
                      href='#'
                    >
                      <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                      <span className='header__user-name user__name'>
                        Oliver.conner@gmail.com
                      </span>
                      <span className='header__favorite-count'>3</span>
                    </a>
                  </li>
                  <li className='header__nav-item'>
                    <a className='header__nav-link' href='#'>
                      <span className='header__signout'>Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className='page__main page__main--index'>
          <h1 className='visually-hidden'>Cities</h1>
          <div className='tabs'>
            <section className='locations container'>
              <CitiesList cities={CITIES}/>
            </section>
          </div>
          <div className='cities'>
            <div className='cities__places-container container'>
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className="places__found">{`${currentCityOffers.length} places to stay in ${city}`}</b>
                <form className='places__sorting' action='#' method='get'>
                  <span className='places__sorting-caption'>Sort by</span>
                  <span className='places__sorting-type' tabIndex={0}>
                    Popular
                    <svg className='places__sorting-arrow' width='7' height='4'>
                      <use xlinkHref='#icon-arrow-select'></use>
                    </svg>
                  </span>
                  <ul className='places__options places__options--custom places__options--opened'>
                    <li
                      className='places__option places__option--active'
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className='places__option' tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className='places__option' tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className='places__option' tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <div className='cities__places-list places__list tabs__content'>
                  <OffersList
                    offers={currentCityOffers}
                    setSelectedOffer={setActiveOfferId}
                  />
                </div>
              </section>
              <div className='cities__right-section'>
                <section className='cities__map map'>
                  <Map
                    location={offers[0].city.location}
                    offers={currentCityOffers}
                    selectedOffer={selectedOffer}
                  />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
