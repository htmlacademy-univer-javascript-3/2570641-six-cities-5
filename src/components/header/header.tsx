import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutAction } from '@/store/api';
import { getAuthorizationStatus, getUserEmail } from '@/store/user-process/selectors';
import { memo } from 'react';
import { getFavorites } from '@/store/favorites/selectors';

function HeaderNav(): JSX.Element {
  const favorites = useAppSelector(getFavorites)!;
  const favoritesCount = favorites.filter((offer) => offer.isFavorite).length;

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const handleSignOut = () => {
    dispatch(logoutAction());
  };
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{userEmail}</span>
                <span className="header__favorite-count">{favoritesCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" onClick={handleSignOut}>
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>)
          : (
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );

}

const MemoizedHeaderNav = memo(HeaderNav);
export default MemoizedHeaderNav;
