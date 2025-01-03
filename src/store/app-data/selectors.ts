import { NameSpace } from '@/const';
import { State } from '@/types/state';
import { SortType } from '@/const';
import { City } from '@/types/city';

export const getCity = (state: State): City => state[NameSpace.App].city;
export const getSortType = (state: State): SortType => state[NameSpace.App].sortType;
