import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';
import {
  GamesResultsData,
  OneGameResponse,
} from '@/types/responses/gameResponseDto';

import { useQuery } from '@tanstack/react-query';
import { rawgApi } from '@/utils/axiosInstances';

export default function useApiGame(): querySearchApiReturn {
  const [query, setQuery] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<OneGameResponse | null>(
    null
  );
  const [searchGamesData, setSearchGamesData] = useState<
    GamesResultsData | undefined
  >(undefined);

  const { refetch: searchGames, isLoading: isSearching } = useQuery({
    queryKey: ['gamesApiSearch', query],
    queryFn: async (query): Promise<GamesResultsData> => {
      if (!query) return Promise.reject('Query is required');
      const response = await rawgApi.get('/games', {
        params: {
          search: query.queryKey[1],
        },
      });

      return Promise.resolve<GamesResultsData>(
        response.data as GamesResultsData
      );
    },
    enabled: false,
  });

  const debounceSearch = useDebouncedCallback((gameName: string) => {
    setQuery(gameName);
  }, 1000); // debounce search

  const handleSelectGame = (gameId: number) => {
    const game = searchGamesData?.results.find((game) => game.id === gameId);
    setSelectedGame(game ?? null);
  };

  const resetGameSelection = () => {
    setSelectedGame(null);
    setSearchGamesData(undefined);
  };

  useEffect(() => {
    if (query.length > 0) {
      searchGames()
        .then((result) => {
          setSearchGamesData(result.data);
        })
        .catch(() => {
          toast.error('Error al buscar los juegos');
        });
    }
    else{
      setSearchGamesData(undefined);
    }
  }, [query, searchGames]);

  return {
    isFetching: isSearching,
    handleSearchGame: debounceSearch,
    selectedGame,
    handleSelectGame,
    resetGameSelection,
    apiGamesData: searchGamesData,
  };
}

interface querySearchApiReturn {
  isFetching: boolean;
  handleSearchGame: (gameName: string) => void;
  selectedGame: OneGameResponse | null;
  handleSelectGame: (gameId: number) => void;
  resetGameSelection: () => void;
  apiGamesData: GamesResultsData | undefined;
}
