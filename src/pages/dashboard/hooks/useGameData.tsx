import { Key, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PostgrestError } from '@supabase/supabase-js';
import { gameListResponseDto } from '../../../types/responses/gameResponseDto';
import { getAllGames, saveGame } from '../utils/gamesService';
import useSession from '../../../hooks/session/useSession';
import { gameFieldsTypes } from '../../../types/general/general';
import { tabStatus } from '../../../utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import addGameSchema from '../schema';
import { useForm } from 'react-hook-form';

type gamesType = {
  data: gameListResponseDto[] | null;
  error: PostgrestError | null;
};

export type saveGameFunctionType = {
  (data: gameFieldsTypes, onSuccess?: () => void): void;
};

export default function useGameData() {
  const [games, setGames] = useState<gamesType | null>(null);

  const [tabsCount, setTabsCount] = useState({
    active: 0,
    completed: 0,
  });
  const { session } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const getAllGamesData = async (status: Key = tabStatus.active) => {
    const allGames = await getAllGames({
      userId: session?.user?.id ?? '',
      query: {
        status,
      },
    });
    setGames(allGames);
  }; // fetch on demand with query params

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
      getAllGamesData();
      toast.success('Juego guardado correctamente');
      onSuccess && onSuccess();
      setIsSaving(false);
    }
  }; // save game to db

  const handleSetSelectedGame = (id: number | null) => {
    const game = games?.data?.find(
      (game: gameListResponseDto) => game.id === id,
    );
    if (game) {
      setValue('game_title', game.game_title);
      setValue('game_description', game.game_description);
      setValue('status', game.status);
      setValue('genres', game.genres.toString());
      setValue('platforms', game.platforms.toString());
      setValue('game_picture', game.game_picture);
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
      game_title: '',
      game_description: '',
      status: '',
      genres: '',
      platforms: '',
      game_picture: '',
    },
    resolver: yupResolver(addGameSchema),
  });

  useEffect(() => {
    getAllGamesData();
    getGamesCount();
  }, []); // fetch all games on mount

  useEffect(() => {
    getGamesCount();
  }, [games]); // update tabs count when new game is added

  useEffect(() => {
    if (games?.error) {
      toast.error('Error al cargar los juegos');
    }
  }, [games?.error?.message]); // show error if exists

  return {
    games,
    handleSaveGame,
    getAllGamesData,
    tabsCount,
    handleSetSelectedGame,
    formikEditGame: {
      register,
      handleSubmit,
      errors,
      setValue,
      getValues,
    },
  };
}
