import { Key, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PostgrestError } from '@supabase/supabase-js';
import { gameListResponseDto } from '@/types/responses/gameResponseDto';
import {
  deleteGame,
  getAllGames,
  saveGame,
  searchGameByTitle,
} from '../utils/gamesService';
import useSession from '@/hooks/session/useSession';
import { gameFieldsTypes } from '@/types/general/general';
import { tabStatus } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import addGameSchema from '../schema';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

type gamesType = {
  data: gameListResponseDto[] | null;
  error: PostgrestError | null;
};

export type saveGameFunctionType = {
  (data: gameFieldsTypes, onSuccess?: () => void): Promise<void>;
};

export default function useGameData() {
  const [games, setGames] = useState<gamesType | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null); // for delete game
  const [tabsCount, setTabsCount] = useState({
    active: 0,
    completed: 0,
  });
  const { session } = useSession();
  const [isSaving, setIsSaving] = useState(false); // for save game button
  const handleGameSearch = useDebouncedCallback(async (gameName: string) => {
    await searchGames(gameName);
  }, 1000); // debounce search

  const getAllGamesData = async (status: Key = tabStatus.active) => {
    const allGames = await getAllGames({
      userId: session?.user?.id ?? '',
      query: {
        status,
      },
    });
    setGames(allGames);
  }; // fetch on demand with query params

  const searchGames = async (query: string) => {
    if (!query) return getAllGamesData();

    const searchedGames = await searchGameByTitle(
      query,
      session?.user?.id ?? ''
    );
    setGames(searchedGames);
  };

  const getGamesCount = async () => {
    const actives = await getAllGames({
      userId: session?.user?.id ?? '',
      query: { status: tabStatus.active },
    });
    const completed = await getAllGames({
      userId: session?.user?.id ?? '',
      query: { status: tabStatus.completed },
    });
    setTabsCount({
      active: actives?.data?.length ?? 0,
      completed: completed?.data?.length ?? 0,
    });
  }; // set tabs count

  const handleSaveGame: saveGameFunctionType = async (data, onSuccess) => {
    if (isSaving) return;
    setIsSaving(true);

    const newGame = await saveGame(data, session?.user?.id ?? '');

    if (newGame.error) {
      setIsSaving(false);
      toast.error('Error al guardar el juego');
    } else {
      await getAllGamesData();
      toast.success('Juego guardado correctamente');
      onSuccess && onSuccess();
      setIsSaving(false);
    }
  }; // save game to db

  const handleDeleteGame = async () => {
    if (!selectedGameId) return toast.error('Error al eliminar el juego');

    const deletedGame = await deleteGame(selectedGameId);

    if (deletedGame.error) {
      toast.error('Error al eliminar el juego');
    } else {
      await getAllGamesData();
      toast.success('Juego eliminado correctamente');
      setSelectedGameId(null);
    }
  };

  const handleSetSelectedGame = (id: number | null) => {
    const game = games?.data?.find(
      (game: gameListResponseDto) => game.id === id
    );

    if (game) {
      setSelectedGameId(game.id);
      setValue('gameTitle', game.game_title);
      setValue('gameDescription', game.game_description);
      setValue('status', game.status);
      setValue('genres', game.genres.toString());
      setValue('platforms', game.platforms.toString());
      setValue('gamePicture', game.game_picture);
    } else {
      setSelectedGameId(null);
    }
  }; // set selected game to edit by game id

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      gameTitle: '',
      gameDescription: '',
      status: '',
      genres: '',
      platforms: '',
      gamePicture: '',
    },
    resolver: yupResolver(addGameSchema),
  });

  useEffect(() => {
    getAllGamesData().catch(() => toast.error('Error al cargar los juegos'));
    getGamesCount().catch(() => toast.error('Error al cargar los juegos'));
  }, []); // fetch all games on mount

  useEffect(() => {
    getGamesCount().catch(() => toast.error('Error al cargar los juegos'));
  }, [games]); // update tabs count when new game is added

  return {
    games,
    handleSaveGame,
    getAllGamesData,
    tabsCount,
    handleSetSelectedGame,
    handleDeleteGame,
    handleGameSearch,
    formikEditGame: {
      register,
      handleSubmit,
      errors,
      setValue,
      getValues,
    },
  };
}
