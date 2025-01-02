import { AppRoute } from '@/const';
import { Link } from 'react-router-dom';

export default function Logo(): JSX.Element {
  return (
    <div className="header__left">
      <Link className="header__logo-link" to={AppRoute.Root}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </div>
  );
}
