import { Offer } from '@/types/offer';
import PlaceCard from '@/components/cards/place-card';

type NearbyProps = {
    offer: Offer;
}

export function NearbyCard({ offer }: NearbyProps) {
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
