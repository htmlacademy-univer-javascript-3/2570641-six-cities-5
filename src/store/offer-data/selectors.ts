import { NameSpace } from '../../const';
import { State } from '@/types/state';
import { Reviews } from '@/types/review';
import { Offer, Offers} from '@/types/offer';

export const getOffer = (state: State): Offer | null => state[NameSpace.CurrentOffer].offer;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.CurrentOffer].nearbyOffers;
export const getReviews = (state: State): Reviews => state[NameSpace.CurrentOffer].reviews;
export const getOfferNotFound = (state: State): boolean => state[NameSpace.CurrentOffer].notFound;
