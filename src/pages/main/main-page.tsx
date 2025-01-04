import OffersList from '@/components/offers/offers-list';
import {Offers} from '@/types/offer';
import {useState, useEffect} from 'react';
import CitiesList from '@/components/map/cities-list';
import { CITIES, SortType } from '@/const';
import { useAppSelector } from '@/hooks/index';
import HeaderNav from '@/components/header/header';
import SpinnerPage from '../spinner/spinner-page';
import { getOffers } from '@/store/offers-data/selectors';
import { getCity, getSortType } from '@/store/app-data/selectors';
import NotFoundOffersList from '@/components/offers/empty-offers-list';

export default function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const sortType = useAppSelector(getSortType);

  const [currentCityOffers, setCurrentCityOffers] = useState<Offers>(offers);


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
            {currentCityOffers!.length > 0
              ? <OffersList offers={currentCityOffers} city={city} />
              : <NotFoundOffersList city={city} />}
          </div>
        </main>
      </div>
    </>
  );
}
