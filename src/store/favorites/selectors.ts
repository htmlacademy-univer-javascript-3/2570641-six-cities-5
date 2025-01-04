import { Offers } from '@/types/offer';
import { NameSpace } from '../../const';
import { State } from '@/types/state';

export const getFavorites = (state: State): Offers => state[NameSpace.Favorites].favorites;
