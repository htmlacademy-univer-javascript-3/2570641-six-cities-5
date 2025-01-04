import { Offers } from '@/types/offer';
import PlaceCard from '@/components/offers/place-card';
import { memo } from 'react';

type OffersListProps = {
    offers: Offers;
    setSelectedOffer: (offer: string | null) => void;
};


function OffersList(props: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {props.offers!.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => props.setSelectedOffer(offer.id)}
          onMouseLeave={() => props.setSelectedOffer(null)}
        >
          <PlaceCard
            key={offer.id}
            offer={offer}
          />
        </div>))}
    </div>
  );
}


const MemoizedOffersList = memo(
  OffersList,
  (prevProps, nextProps) => prevProps.offers?.map((offer) => offer.id).join() === nextProps.offers?.map((offer) => offer.id).join()

);
export default MemoizedOffersList;
