import React from 'react';
import { render } from '@testing-library/react-native';
import { ModalComponent } from './Modal';

jest.mock('react-native/Libraries/Modal/Modal', () => 'Modal');

test('renders title correctly', () => {
  const { getByText } = render(
    <ModalComponent
      isModalOpen={true}
      setIsModalOpen={() => {}}
      title="Test Title"
      titleButton="Close"
    />
  );

  expect(getByText('Test Title')).toBeTruthy();
});