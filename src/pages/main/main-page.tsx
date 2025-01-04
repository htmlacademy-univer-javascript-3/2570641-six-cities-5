import OffersList from '@/components/offers/offers-list';
import {Offers} from '@/types/offer';
import Map from '@/components/map/map';
import {useState, useEffect} from 'react';
import CitiesList from '@/components/map/cities-list';
import { CITIES, SortType } from '@/const';
import { useAppSelector } from '@/hooks/index';
import SortingOptions from '@/components/offers/offers-sort';
import HeaderNav from '@/components/header/header';
import SpinnerPage from '../spinner/spinner-page';
import { getOffers } from '@/store/offers-data/selectors';
import { getCity, getSortType } from '@/store/app-data/selectors';

export default function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const sortType = useAppSelector(getSortType);

  const [currentCityOffers, setCurrentCityOffers] = useState<Offers>(offers);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);


  useEffect(() => {
    const filteredOffers = offers!.filter((offer) => offer.city.name === city.name);

    const sortedOffers = [...filteredOffers].sort((a, b) => {
      switch (sortType) {
        case SortType.PriceLowToHigh:
          return a.price - b.price;
        case SortType.PriceHighToLow:
          return b.price - a.price;
        case SortType.TopRated:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setCurrentCityOffers(sortedOffers);
  }, [city, offers, sortType]);


  if (offers === undefined) {
    return (
      <SpinnerPage />
    );
  }

  const selectedOffer = offers.find((offer) => offer.id === activeOfferId);

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
              <HeaderNav />
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
                <b className="places__found">{`${currentCityOffers!.length} places to stay in ${city.name}`}</b>
                <SortingOptions />
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
                    location={city.location}
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
