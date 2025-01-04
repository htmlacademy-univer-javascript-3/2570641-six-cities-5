import { Offers } from '@/types/offer';
import NearbyCard from '@/components/offers/nearby';
import { memo } from 'react';

type NearbyListProps = {
    offers: Offers;
}

export function NearbyList({ offers }: NearbyListProps) {
  return (
    <div className='container'>
      <section className='near-places places'>
        <h2 className='near-places__title'>
          Other places in the neighbourhood
        </h2>
        <div className='near-places__list places__list'>
          {offers!.map((offer) => (
            <NearbyCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
    </div>
  );
}


const MemoizedNearbyOffersList = memo(
  NearbyList,
  (prevProps, nextProps) =>
    prevProps.offers?.map((offer) => offer.id).join() === nextProps.offers?.map((offer) => offer.id).join()
);
export default MemoizedNearbyOffersList;
