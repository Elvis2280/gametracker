import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { backendApi } from '@/utils/axiosInstances';
import { useSessionData } from '@/context/SessionContext';
import { GetAllGamesResponseType } from '@/types/responses/gameResponseDto';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
export default function useGameData(): useGameDataReturn {
  const { email } = useSessionData();
  const [isActiveGames, setIsActiveGames] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [search, setSearch] = useState('');
  const { debouncedValue } = useDebounce(search, 500);

  // Query get games
  const {
    data: games,
    refetch: handleGetGames,
    isError: isGetGamesError,
    isLoading: isGetGamesLoading,
  } = useQuery({
    queryKey: ['games', email, perPage, isActiveGames, page, debouncedValue],
    queryFn: async (): Promise<GetAllGamesResponseType> => {
      const response = await backendApi.get('games', {
        params: {
          email: email,
          page: page,
          isActiveGames: isActiveGames,
          limit: perPage,
          search: debouncedValue,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      return response.data;
    },
    enabled: Boolean(email),
  });

  const { data: count } = useQuery({
    queryKey: ['gamesCount', email],
    queryFn: async (): Promise<GameCountResponse> => {
      const response: AxiosResponse<GameCountResponse> = await backendApi.get(
        'games/count',
        {
          params: {
            email: email,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Error al obtener los juegos');
      }

      return response.data;
    },
    enabled: Boolean(email),
  });

  return {
    search,
    handleSetSearch: setSearch,
    handleSetActiveGames: setIsActiveGames,
    handleSetPage: setPage,
    currentPage: page,
    gamesData: {
      isGetGamesLoading,
      isGetGamesError,
      data: games,
    },
    handleGetGames,
    count: count?.counts,
  };
}
interface useGameDataReturn {
  search: string;
  handleSetSearch: (search: string) => void;
  handleSetActiveGames: (isActive: boolean) => void;
  handleSetPage: (page: number) => void;
  currentPage: number;
  gamesData: {
    isGetGamesLoading: boolean;
    isGetGamesError: boolean;
    data: GetAllGamesResponseType | undefined;
  };
  handleGetGames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<GetAllGamesResponseType, Error>>;
  count:
    | {
        active: number;
        completed: number;
      }
    | undefined;
}

interface GameCountResponse {
  counts: {
    active: number;
    completed: number;
  };
}
