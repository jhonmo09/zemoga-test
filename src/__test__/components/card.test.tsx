import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '@/components';
import data from '../mocks/data.json';

describe('Ruling Card', () => {
  it('Should render a ruling card properly', () => {
    render(<Card data={data.data[0]} incrementPositive={() => {}} incrementNegative={() => {}} displayType={'grid'} />);
    const cardHeading = screen.getByRole('heading');
    const headingText = 'Kanye West';

    expect(cardHeading).toHaveTextContent(headingText);
  });
});
