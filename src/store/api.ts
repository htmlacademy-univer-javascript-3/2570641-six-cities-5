import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '@/types/state';
import { Offers, Offer } from '@/types/offer';
import {APIRoute, AuthorizationStatus } from '@/const';
import { dropToken, saveToken } from '@/services/tokens';
import { AuthCredentials, ClientUser } from '@/types/auth';
import { Review, ReviewForm, Reviews } from '@/types/review';
import { loadOffers } from './offers-data/offers-data';
import { setAuthorizationStatus, setUserEmail } from './user-process/user-process';
import { clearFavorite, loadOffer, offerNotFound, sendReview } from './offer-data/offer-data';
import { setFavoriteStatus, updateFavorites } from './favorites/favorites';

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
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
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
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserEmail(email));
  },
);

export const fetchFavorites = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'favorites/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data: responseOffers} = await api.get<Offers>(`${APIRoute.Favorite}`);
    dispatch(updateFavorites(responseOffers));
  }
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
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(fetchOffersAction());
    dispatch(fetchFavorites());
    dispatch(clearFavorite());
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
      const { data: nearbyOffers } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
      const { data: reviews } = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);
      dispatch(loadOffer({ offer, nearbyOffers, reviews }));
    } catch{
      dispatch(offerNotFound());
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


export const sendChangeFavoritesStatusAction = createAsyncThunk<void, Offer , {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'favorites/changeFavoritesStatusAction',
  async (offer , {dispatch, extra: api}) => {
    const { data: responseOffer } = await api.post<Offer>(`${APIRoute.Favorite}/${offer.id}/${offer.isFavorite ? 0 : 1}`);
    dispatch(setFavoriteStatus(responseOffer));
  }
);
