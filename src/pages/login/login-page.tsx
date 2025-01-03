import { Helmet } from 'react-helmet-async';
import { useAppDispatch } from '@/hooks/index';
import { useState } from 'react';
import { fetchOffersAction, loginAction } from '@/store/api';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/const';

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (password.includes(' ')) {
      setPasswordError('Password cannot contain spaces');
      return;
    }

    setPasswordError('');
    dispatch(loginAction({ login: email, password })).then(() => {
      dispatch(fetchOffersAction());
      navigate(AppRoute.Root);
    });


  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className='header__wrapper'>
            <div className='header__left'>
              <a className='header__logo-link' href='main.html'>
                <img
                  className='header__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width='81'
                  height='41'
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email"
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                />
                {passwordError && <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>}
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
