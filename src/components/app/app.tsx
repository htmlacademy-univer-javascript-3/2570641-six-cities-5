import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '@/const';
import PrivateRoute from '@/components/private/private-route';
import LoginPage from '@/pages/login/login-page';
import MainPage from '@/pages/main/main-page';
import OfferPage from '@/pages/offer/offer-page';
import FavoritesPage from '@/pages/favorites/favorites-page';
import NotFoundPage from '@/pages/not-found/not-found-page';
import { offers as mockOffers } from '@/mocks/offers';
// import { Offers } from '@/types/offer';

// type AppProps = {
//   offers: Offers;
// }

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage offers={mockOffers}/>}
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
                <FavoritesPage offers={mockOffers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage offers={mockOffers}/>}
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
