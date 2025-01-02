import { useState } from 'react';
import { SortType } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { setSortType } from '@/store/action';

export default function SortingOptions(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentSortType = useAppSelector((state) => state.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (sortType: SortType) => {
    dispatch(setSortType(sortType));
    setIsOpen(false);
  };


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortType).map((sortType) => (
            <li
              key={sortType}
              className={`places__option ${currentSortType === sortType ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleOptionClick(sortType)}
            >
              {sortType}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
