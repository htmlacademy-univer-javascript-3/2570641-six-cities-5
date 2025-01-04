import { Offers } from '@/types/offer';
import { memo, useState } from 'react';
import { City } from '@/types/city';
import Map from '@/components/map/map';
import PlaceCard from './place-card';
import SortingOptions from './offers-sort';

type OffersListProps = {
    offers: Offers;
    city: City;
};


function OffersList({offers, city}: OffersListProps): JSX.Element {
  const [activeOfferId, setSelectedOffer] = useState<string | null>(null);

  const selectedOffer = offers!.find((offer) => offer.id === activeOfferId);


  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className="places__found">{`${offers!.length} places to stay in ${city.name}`}</b>
        <SortingOptions />
        <div className='cities__places-list places__list tabs__content'>
          {offers!.map((offer) => (
            <div
              key={offer.id}
              onMouseEnter={() => setSelectedOffer(offer.id)}
              onMouseLeave={() => setSelectedOffer(null)}
            >
              <PlaceCard
                key={offer.id}
                offer={offer}
              />
            </div>))}
        </div>
      </section>
      <div className='cities__right-section'>
        <section className='cities__map map'>
          <Map
            location={city.location}
            offers={offers}
            selectedOffer={selectedOffer}
          />
        </section>
      </div>
    </div>

  );
}


const MemoizedOffersList = memo(
  OffersList,
  (prevProps, nextProps) => prevProps.offers?.map((offer) => offer.id).join() === nextProps.offers?.map((offer) => offer.id).join() &&
  prevProps.offers?.map((offer) => offer.isFavorite).join() === nextProps.offers?.map((offer) => offer.isFavorite).join()

);
export default MemoizedOffersList;
