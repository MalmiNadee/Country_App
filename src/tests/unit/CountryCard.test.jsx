import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { describe, test, expect, jest } from '@jest/globals';
import CountryCard from '../../components/CountryCard';

jest.mock('../../components/FavoritesButton', () => {
  return function MockFavoritesButton() {
    return <div data-testid="favorites-button"></div>;
  };
});

describe('CountryCard Component', () => {
  //mock country data for testing
  const mockCountry = {
    name: { common: 'Sri Lanka' },
    capital: ['Colombo'],
    region: 'Asia',
    population: 21803000,
    flags: { png: 'https://flagcdn.com/w320/lk.png' },
    languages: { sin: 'Sinhala', tam: 'Tamil' },
    cca3: 'LKA'
  };

  //verify all country information renders correctly
  test('renders country information correctly', () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    );
    
    //check all expected country data displayed
    expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
    expect(screen.getByText(/Asia/i)).toBeInTheDocument();
    expect(screen.getByText(/21,803,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Sinhala/i)).toBeInTheDocument();
    expect(screen.getByText(/Tamil/i)).toBeInTheDocument();
    expect(screen.getByAltText('Flag of Sri Lanka')).toHaveAttribute('src', 'https://flagcdn.com/w320/lk.png');
  });

  test('handles missing optional data gracefully', () => {
    const incompleteCountry = {
      ...mockCountry,
      capital: undefined,
      currencies: undefined,
      languages: undefined
    };
    
    render(
      <MemoryRouter>
        <CountryCard country={incompleteCountry} />
      </MemoryRouter>
    );
    
    //Check fallback text(N/A) appears for missing data
    expect(screen.getByText((_, el) =>
      el.textContent === 'Currencies: N/A')).toBeInTheDocument();
  
    expect(screen.getByText((_, el) =>
      el.textContent === 'Languages: N/A')).toBeInTheDocument();
  });
});
