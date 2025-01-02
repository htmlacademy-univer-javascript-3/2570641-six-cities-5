import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '@/const';
import PrivateRoute from '@/components/private/private-route';
import LoginPage from '@/pages/login/login-page';
import MainPage from '@/pages/main/main-page';
import OfferPage from '@/pages/offer/offer-page';
import FavoritesPage from '@/pages/favorites/favorites-page';
import NotFoundPage from '@/pages/not-found/not-found-page';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { setOffersList, } from '@/store/action';


export default function App(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();
  dispatch(setOffersList(offers));

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
