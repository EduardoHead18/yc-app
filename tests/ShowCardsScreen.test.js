import React from 'react';
import { render } from '@testing-library/react-native';
import ShowCards from '../src/screens/ShowCardsScreen';
import { useNavigation } from '@react-navigation/native';
import { findOnePost } from '../src/services/findOnePost';
import Geocoder from 'react-native-geocoding';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../src/services/findOnePost', () => ({
  findOnePost: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock('react-native-geocoding', () => ({
  init: jest.fn(),
  from: jest.fn(() => Promise.resolve({
    results: [
      {
        geometry: {
          location: {
            lat: 0,
            lng: 0,
          },
        },
      },
    ],
  })),
}));

describe('ShowCards Component', () => {
  test('should display "Cargando..." while loading data', () => {
    const { getByText } = render(<ShowCards route={{ params: { postId: 1 } }} />);
    expect(getByText('Cargando...')).toBeTruthy();
  });
});