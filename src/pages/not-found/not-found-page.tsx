import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';

export default function NotFoundScreen(): JSX.Element {
  return (
    <div className="six-cities">
      <Helmet>
        <title>6 cities: page not found</title>
      </Helmet>

      <div className="error__page" style={{ textAlign: 'center', marginTop: '30%' }}>
        <h1 className="error__name">Error 404: Page not found</h1>
        <Link to={AppRoute.Root}>Return to home page</Link>
      </div>
    </div>
  );
}
