import fetchMock from 'jest-fetch-mock';
import { findOneSubscription } from '../src/services/subscription/findOneSuscription';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('findOneSubscription', () => {
  it('should fetch user subscription data', async () => {
    const mockUserId = '123';
    const mockApiResponse = { /* ... tu respuesta simulada ... */ };

    fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

    const result = await findOneSubscription(mockUserId);

    expect(fetchMock).toHaveBeenCalledWith(`https://your-confort-backend.onrender.com/api/v1/user_subscription/${mockUserId}`);

    expect(result).toEqual(mockApiResponse);
  });

  it('should handle fetch errors', async () => {
    const mockUserId = '123';

    // Simula un error en la petición
    fetchMock.mockRejectOnce(new Error('Network error'));

    const result = await findOneSubscription(mockUserId);

    // Verifica que la función devuelva undefined en caso de error
    expect(result).toBeUndefined();
  });
});
