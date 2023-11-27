import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { searchGames } from '../utils/gamesInfoApi';
import { useEffect, useState } from 'react';
import {
  gamesApiDto,
  gamesApiResponseDto,
} from '../../../types/responses/gameResponseDto';
import addGameSchema from '../schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type querySearchApiType = {
  data: gamesApiResponseDto | undefined;
  refetch: () => void;
  isFetching: boolean;
};

export default function useApiGame() {
  const [query, setQuery] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<gamesApiDto | null>(null);
  const [searchGamesData, setSearchGamesData] = useState<
    gamesApiResponseDto | undefined
  >(undefined);
  const {
    refetch: fetchSearchGameApi,
    isFetching: isSearchFetching,
  }: querySearchApiType = useQuery(
    ['gamesApiSearch', query],
    () => searchGames(query),
    {
      enabled: false,
      onError: () => toast.error('Error al buscar los juegos'),
      refetchOnWindowFocus: false,
      refetchInterval: false,
      onSuccess: (data: gamesApiResponseDto) => {
        setSearchGamesData(data);
      },
    },
  ); // fetch on demand with query params

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      game_title: selectedGame?.name ?? '',
      game_description: '',
      status: '',
      genres: '',
      platforms: '',
      game_picture: selectedGame?.background_image ?? '',
    },
    resolver: yupResolver(addGameSchema),
  });

  useEffect(() => {
    if (selectedGame) {
      setValue('game_title', selectedGame?.name ?? '');
      setValue('game_picture', selectedGame?.background_image ?? '');
    }
  }, [selectedGame]);

  useEffect(() => {
    if (query.length > 0) {
      fetchSearchGameApi();
    }
  }, [query]); // call api when query change

  return {
    debounceSearch,
    isSearchFetching,
    searchGamesData,
    handleSelectGame,
    selectedGame,
    register,
    handleSubmit,
    errors,
    resetGameSelection,
  };
}
