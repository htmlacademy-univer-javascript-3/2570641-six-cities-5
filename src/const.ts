export enum AuthorizationStatus {
  Auth ='AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Setting = {
  PlacesCount: 32,
};

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export const URL_PIN =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
export const URL_PIN_ACTIVE =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES = [
  {
    name: 'Paris',
    id: 1,
  },
  {
    name: 'Cologne',
    id: 2,
  },
  {
    name: 'Brussels',
    id: 3,
  },
  {
    name: 'Amsterdam',
    id: 4,
  },
  {
    name: 'Hamburg',
    id: 5,
  },
  {
    name: 'Dusseldorf',
    id: 6,
  },
];

export const DEFAULT_CITY = CITIES[0];
