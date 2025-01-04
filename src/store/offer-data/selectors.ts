import { NameSpace } from '../../const';
import { CurrentOfferData, State } from '@/types/state';

export const getOfferState = (state: State): CurrentOfferData => state[NameSpace.CurrentOffer];
