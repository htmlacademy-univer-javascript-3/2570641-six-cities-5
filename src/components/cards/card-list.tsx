import { Offers, Offer } from '@/types/offer';
import PlaceCard from '@/components/cards/place-card';

type CardListProps = {
    offers: Offers;
    selectedOffer: Offer | null;
    setSelectedOffer: (offer: Offer | null) => void;
};


export default function CardList(props: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {props.offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => props.setSelectedOffer(offer)}
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
