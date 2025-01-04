import { NameSpace } from '@/const';
import { State } from '@/types/state';
import { Offer } from '@/types/offer';

export const getOffers = (state: State): Offer[] | undefined => state[NameSpace.Offers].offers;
