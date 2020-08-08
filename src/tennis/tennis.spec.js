import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Tennis from './tennis';

describe('UI interactions tests & effect on screen rendered result', () => {

    it('clicking a button increases the score for player A', () => {
        const { getByTestId } = render(<Tennis />);
        fireEvent.click(getByTestId('scoreForA'));
        expect(getByTestId('pointA')).toHaveTextContent('15');
        fireEvent.click(getByTestId('scoreForA'));
        expect(getByTestId('pointA')).toHaveTextContent('30');
    });

    it('deuce scenario - clicking buttons for both players A & B', () => {
        const { getByTestId } = render(<Tennis />);
        fireEvent.click(getByTestId('scoreForA'));
        fireEvent.click(getByTestId('scoreForA'));
        fireEvent.click(getByTestId('scoreForA'));
        fireEvent.click(getByTestId('scoreForB'));
        fireEvent.click(getByTestId('scoreForB'));
        fireEvent.click(getByTestId('scoreForB'));
        fireEvent.click(getByTestId('scoreForA'));
        expect(getByTestId('pointA')).toHaveTextContent('ADV');
        fireEvent.click(getByTestId('scoreForB'));
        expect(getByTestId('pointA')).toHaveTextContent('40');
        expect(getByTestId('pointB')).toHaveTextContent('40');
        fireEvent.click(getByTestId('scoreForB'));
        expect(getByTestId('pointB')).toHaveTextContent('ADV');
    });

});