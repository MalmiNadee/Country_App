import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import Search from '../../components/Search';
import Filter from '../../components/Filter';

//Integration Testing
describe('Search and Filter Components Integration', () => {
  // mock callback functions for testing search and filter work together
  const mockOnSearch = jest.fn();
  const mockOnFilter = jest.fn();

  //Helper function to render both components together
  const renderSearchAndFilter = () => {
    return render(
      <div>
        <Search onSearch={mockOnSearch} />
        <Filter onFilter={mockOnFilter} />
      </div>
    );
  };

  //clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should update search and filter independently', () => {
    renderSearchAndFilter();

    // To test search interaction
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Canada' } });
    fireEvent.click(screen.getByRole('button'));

    // To test filter interaction
    const regionFilter = screen.getByLabelText('Filter by Region');
    fireEvent.change(regionFilter, { target: { value: 'Asia' } });

    expect(mockOnSearch).toHaveBeenCalledWith('Canada');
    expect(mockOnFilter).toHaveBeenCalledWith({
      region: 'Asia',
      language: 'All',
      currency: 'All'
    });
  });

  //test search input keep its value during filter operation
  test('should maintain separate states for search and filter', () => {
    renderSearchAndFilter();

    // Set search value
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Japan' } });

    // Set filter value
    const languageFilter = screen.getByLabelText('Filter by Language');
    fireEvent.change(languageFilter, { target: { value: 'Japanese' } });

    // check search input maintains its value
    expect(searchInput.value).toBe('Japan');
    
    // check filter callback was called correctly
    expect(mockOnFilter).toHaveBeenCalledWith({
      region: 'All',
      language: 'Japanese',
      currency: 'All'
    });
  });

  //test both search and filter operations together
  test('should allow combined search and filter operations', () => {
    renderSearchAndFilter();

    // Perform search operation
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Canada' } });
    fireEvent.click(screen.getByRole('button'));

    // Perform filter operation
    const currencyFilter = screen.getByLabelText('Filter by Currency');
    fireEvent.change(currencyFilter, { target: { value: 'United States Dollar' } });

    // Verify both operations were processed correctly
    expect(mockOnSearch).toHaveBeenCalledWith('Canada');
    expect(mockOnFilter).toHaveBeenCalledWith({
      region: 'All',
      language: 'All',
      currency: 'United States Dollar'
    });
  });

  test('should not interfere with each other when used simultaneously', () => {
    renderSearchAndFilter();

    // test with search with whitespace 
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: '  Mexico  ' } }); // With whitespace
    fireEvent.click(screen.getByRole('button'));

    // Test with filter
    const regionFilter = screen.getByLabelText('Filter by Region');
    fireEvent.change(regionFilter, { target: { value: 'Americas' } });

    // Verify search trimmed the input
    expect(mockOnSearch).toHaveBeenCalledWith('Mexico');
    
    // Verify filter was called correct values
    expect(mockOnFilter).toHaveBeenCalledWith({
      region: 'Americas',
      language: 'All',
      currency: 'All'
    });
  });
});