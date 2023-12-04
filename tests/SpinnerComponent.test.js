import { render } from '@testing-library/react-native';
import { SpinnerComponet } from './SpinnerComponent';

describe('SpinnerComponent', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<SpinnerComponet />);
    expect(getByTestId('spinner')).toBeTruthy();
  });
})