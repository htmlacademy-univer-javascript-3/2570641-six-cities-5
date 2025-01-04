import { Offer } from '@/types/offer';
import PlaceCard from '@/components/offers/place-card';
import { memo } from 'react';

type NearbyProps = {
    offer: Offer;
}

function NearbyCard({ offer }: NearbyProps) {
  return (
    <article className='near-places__card place-card'>
      <div className='near-places__image-wrapper place-card__image-wrapper'>
        <a href='#'>
          <img
            className='place-card__image'
            src={offer.previewImage}
            width='260'
            height='200'
            alt='Place image'
          />
        </a>
      </div>
      <PlaceCard offer={offer} />
    </article>
  );
}

const MemoizedNearbyCard = memo(NearbyCard);
export default MemoizedNearbyCard;
