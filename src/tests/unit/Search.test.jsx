import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, jest } from '@jest/globals';
import Search from '../../components/Search';

//Search component Unit Testing
describe('Search Component', () => {
    test('renders search input and button', () => {
        const mockOnSearch = jest.fn();
        render(<Search onSearch={mockOnSearch}/>);

        //check if search input and button with icon are rendered
        expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        //check FaSearch icon
        expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
    });

    test('update search state on input change', () => {
        const mockOnSearch = jest.fn();
        render(<Search onSearch={mockOnSearch}/>);

        const input = screen.getByPlaceholderText('Search for a country...');
        fireEvent.change(input, { target: { value: 'Canada'}});

        expect(input.value).toBe('Canada');
    });

    test('calls onSearch with trimmed value on form submit', () => {
        const mockOnSearch = jest.fn();
        render(<Search onSearch={mockOnSearch}/>);

        //test search submit button
        const input = screen.getByPlaceholderText('Search for a country...');
        const button = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'Canada'}});
        fireEvent.click(button);

        //check callback with input
        expect(mockOnSearch).toHaveBeenCalledWith('Canada');
    });

    test('does not call onSearch for empty input', () => {
        const mockOnSearch = jest.fn();
        render(<Search onSearch={mockOnSearch}/>);

        //test empty search doesn't trigger callback
        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockOnSearch).not.toHaveBeenCalled();
    });
})