import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { describe, expect, test, jest } from '@jest/globals';
import Filter from '../../components/Filter';

//Filter component Unit Testing
describe('Filter Component', () => {
    test('renders all filter dropdowns', () => {
        const mockOnFilter = jest.fn();
        render(<Filter onFilter={mockOnFilter}/>);

        //check all filter dropdowns are rendered
        expect(screen.getByLabelText('Filter by Region')).toBeInTheDocument();
        expect(screen.getByLabelText('Filter by Language')).toBeInTheDocument();
        expect(screen.getByLabelText('Filter by Currency')).toBeInTheDocument();
    });

    test('update and calls onFilter when region changes', () => {
        const mockOnFilter = jest.fn();
        render(<Filter onFilter={mockOnFilter}/>);

        //simulate changing region dropdown
        const regionSelect = screen.getByLabelText('Filter by Region');
        fireEvent.change(regionSelect, { target: { value: 'Asia'}});

        //verify callback with expected filter values
        expect(mockOnFilter).toHaveBeenCalledWith({
            region: 'Asia',
            language: 'All',
            currency: 'All'
            
        });
    });

    test('update and calls onFilter when language changes', () => {
        const mockOnFilter = jest.fn();
        render(<Filter onFilter={mockOnFilter}/>);

        const languageSelect = screen.getByLabelText('Filter by Language');
        fireEvent.change(languageSelect, { target: { value: 'Japanese'}});

        expect(mockOnFilter).toHaveBeenCalledWith({
            region: 'All',
            language: 'Japanese',
            currency: 'All'
            
        });
    });

    test('update and calls onFilter when currency changes', () => {
        const mockOnFilter = jest.fn();
        render(<Filter onFilter={mockOnFilter}/>);

        const currencySelect = screen.getByLabelText('Filter by Currency');
        fireEvent.change(currencySelect, { target: { value: 'United States Dollar'}});

        expect(mockOnFilter).toHaveBeenCalledWith({
            region: 'All',
            language: 'All',
            currency: 'United States Dollar'
            
        });
    });
});