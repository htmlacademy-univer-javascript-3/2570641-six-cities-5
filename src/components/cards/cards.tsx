import { Offers, Offer } from '@/types/offer';
import PlaceCard from '@/components/cards/place-card';

type OffersListProps = {
    offers: Offers;
    // selectedOffer: Offer | null;
    setSelectedOffer: (offer: Offer | null) => void;
};


export default function CardsList(props: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {props.offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => props.setSelectedOffer(offer)}
          onMouseLeave={() => props.setSelectedOffer(null)}
        />))}
    </div>
  );
}
