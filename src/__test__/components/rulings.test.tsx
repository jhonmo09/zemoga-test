import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Rulings } from '@/app/page-components';
import data from '../mocks/data.json';

describe('Rulings grid', () => {
  it('Should render the Rulings Grid', () => {
    render(<Rulings />);
    const RulingsHeading = screen.getByRole('heading');
    const headingText = 'Previous Rulings';

    expect(RulingsHeading).toHaveTextContent(headingText);
  });
});
