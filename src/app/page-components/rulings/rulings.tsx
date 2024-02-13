'use client';
import * as React from 'react';

import { Card } from '@/components';

import { useScreenSize, useFetchLocalJson } from '@/hooks';
import useCardVotes from '@/hooks/card-votes';
import { CardData } from '@/types';

type RulingsProps = {};

const Rulings = (props: RulingsProps) => {
  const screenSize = useScreenSize();
  const [displayType, setDisplayType] = React.useState<'list' | 'grid'>('grid');
  const [openDropDown, setOpenDropdown] = React.useState<boolean>(false);

  const { data, loading, error } = useFetchLocalJson('/data/data.json');

  const cards: CardData[] = data?.data || [];

  const { state, incrementPositive, incrementNegative, dispatch } = useCardVotes(cards);

  const handleDropdownToggle = () => {
    setOpenDropdown(!openDropDown);
  };

  const handleChangeDisplay = (value: 'list' | 'grid') => {
    setOpenDropdown(false);
    setDisplayType(value);
  };

  React.useEffect(() => {
    if (data) {
      dispatch({ type: 'INITIALIZE', data: cards });
    }
  }, [data]);

  return (
    <section className="rulings">
      <div className="rulings__head">
        <h2>Previous Rulings</h2>
        {screenSize.width > 600 && (
          <div className={`rulings__display-select display-select ${openDropDown && 'open'}`}>
            <div className="display-select__current" onClick={handleDropdownToggle}>
              {displayType}
            </div>
            <ul className="display-select__list">
              <li onClick={() => handleChangeDisplay('list')}>List</li>
              <li onClick={() => handleChangeDisplay('grid')}>Grid</li>
            </ul>
          </div>
        )}
      </div>

      <div className={`rulings__content rulings__content--${displayType}`}>
        {state &&
          state.map((item: CardData) => (
            <Card
              key={item.name}
              incrementPositive={incrementPositive}
              incrementNegative={incrementNegative}
              data={item}
              displayType={displayType}
            />
          ))}
      </div>
    </section>
  );
};

export default Rulings;
