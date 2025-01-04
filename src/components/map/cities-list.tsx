import { useAppDispatch } from '@/hooks/index';
import { setCity } from '@/store/app-data/app-data';
import { Cities } from '@/types/city';
import { memo } from 'react';

type CitiesListProps = {
  cities: Cities;
};

function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityChange = (city: string) => {
    dispatch(setCity(cities.find((cityItem) => cityItem.name === city)!));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city.name}
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


const MemoizedCitiesList = memo(CitiesList, (prevProps, nextProps) => prevProps.cities.map((city) => city.name).join() === nextProps.cities.map((city) => city.name).join());
export default MemoizedCitiesList;
