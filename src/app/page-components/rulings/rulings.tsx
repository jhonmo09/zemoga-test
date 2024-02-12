'use client';
import * as React from 'react';

import { Card } from '@/components';
import data from '@/data/data.json';

import { useScreenSize } from '@/hooks';

type RulingsProps = {};

const Rulings = (props: RulingsProps) => {
  const screenSize = useScreenSize();
  const [displayType, setDisplayType] = React.useState<'list' | 'grid'>('grid');

  return (
    <section className="rulings">
      <div className="rulings__head">
        <h2>Previous Rulings</h2>
        {screenSize.width > 600 && (
          <div className="rulings__display-select display-select">
            <div className="display-select__current">Grid</div>
            <ul className="display-select__list">
              <li>List</li>
              <li>Grid</li>
            </ul>
          </div>
        )}
      </div>

      <div className={`rulings__content rulings__content--${displayType}`}>
        {data.data.map((item) => (
          <Card key={item.name} data={item} displayType={displayType} />
        ))}
      </div>
    </section>
  );
};

export default Rulings;
