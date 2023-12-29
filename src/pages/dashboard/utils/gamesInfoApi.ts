import { gamesApiResponseDto } from '@/types/responses/gameResponseDto';
import { rawgApi } from '@/utils/axiosInstances';

export const searchGames = async (query: string) => {
  if (!query) return Promise.reject('Query is required');
  const response = await rawgApi.get('/games', {
    params: {
      search: query,
    },
  });
  return response.data as gamesApiResponseDto;
};
