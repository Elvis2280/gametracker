import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { backendApi } from '@/utils/axiosInstances';
import { useSessionData } from '@/context/SessionContext';
import {
  GameResponseType,
  GetAllGamesResponseType,
} from '@/types/responses/gameResponseDto';

export default function useGameData(): useGameDataReturn {
  const { email } = useSessionData();

  // Query get games
  const {
    data: games,
    refetch: handleGetGames,
    isError: isGetGamesError,
    isLoading: isGetGamesLoading,
  } = useQuery({
    queryKey: ['games', email],
    queryFn: async (): Promise<GetAllGamesResponseType> => {
      const response = await backendApi.get('games', {
        params: {
          email: email,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      return response.data;
    },
    enabled: Boolean(email),
  });
  return {
    gamesData: {
      isGetGamesLoading,
      isGetGamesError,
      data: games?.games,
    },
    handleGetGames,
  };
}

interface useGameDataReturn {
  gamesData: {
    isGetGamesLoading: boolean;
    isGetGamesError: boolean;
    data: GameResponseType[] | undefined;
  };
  handleGetGames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<GetAllGamesResponseType, Error>>;
}
