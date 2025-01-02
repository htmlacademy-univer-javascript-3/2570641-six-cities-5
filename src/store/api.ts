import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '@/types/state';
import { Offers } from '@/types/offer';
import { loadOffers, setOffersDataLoadingStatus } from '@/store/action';
import {APIRoute } from '@/const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffers',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<Offers>(APIRoute.Offers);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadOffers(data));
    },
  );
