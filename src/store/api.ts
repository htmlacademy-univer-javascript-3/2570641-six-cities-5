import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '@/types/state';
import { Offers, Offer } from '@/types/offer';
import { loadOffer, loadOffers, requireAuthorization, sendReview, setUserEmail } from '@/store/action';
import {APIRoute, AuthorizationStatus } from '@/const';
import { dropToken, saveToken } from '@/services/tokens';
import { AuthCredentials, ClientUser } from '@/types/auth';
import { Review, ReviewForm, Reviews } from '@/types/review';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffers',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      dispatch(loadOffers(data));
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const response = await api.get(APIRoute.Login);
      const data = response.data as { email: string };
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthCredentials, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<ClientUser>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserEmail(email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);


export const fetchOneOfferAction = createAsyncThunk<void,
{
  id: string;
},
{ dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferInDetails',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      const { data: offer } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      const { data: nearestOffers } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
      const { data: reviews } = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);
      dispatch(loadOffer({ offer, nearestOffers, reviews }));
    } catch{
      dispatch(loadOffer(null));
    }
  }
);


export const sendReviewAction = createAsyncThunk<void,{ review: ReviewForm; id: string}, { dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/sendReview',
  async ({ review, id }, { dispatch, extra: api }) => {
    const { data: responseReview } = await api.post<Review>(`${APIRoute.Comments}/${id}`,
      {
        comment: review.review,
        rating: review.rating,
      });
    dispatch(sendReview(responseReview));
  });
