import { useAppDispatch } from '@/hooks/index';
import { setCity } from '@/store/action';

type CitiesListProps = {
  cities: {
    name: string;
    id: number;
  }[];
};

export default function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityChange = (city: string) => {
    dispatch(setCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city.id}
          className="locations__item"
          onClick={() => handleCityChange(city.name)}
        >
          <a className="locations__item-link tabs__item" href="#">
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
