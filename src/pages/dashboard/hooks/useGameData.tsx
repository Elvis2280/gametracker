import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PostgrestError } from '@supabase/supabase-js';
import { gameListResponseDto } from '../../../types/responses/gameResponseDto';
import { getAllGames, saveGame } from '../utils/gamesService';
import useSession from '../../../hooks/session/useSession';
import { gameFieldsTypes } from '../../../types/general/general';

type gamesType = {
  data: gameListResponseDto[] | null;
  error: PostgrestError | null;
};

type saveGameFunctionType = {
  (data: gameFieldsTypes, onSuccess?: () => void): void;
};

export default function useGameData() {
  const [games, setGames] = useState<gamesType | null>(null);
  const { session } = useSession();

  const getAllGamesData = async () => {
    const allGames = await getAllGames(session?.user?.id ?? '');
    setGames(allGames);
  }; // fetch on demand with query params

  const handleSaveGame: saveGameFunctionType = async (data, onSuccess) => {
    const newGame = await saveGame(data, session?.user?.id ?? '');
    if (newGame.error) {
      toast.error('Error al guardar el juego');
    } else {
      getAllGamesData();
      toast.success('Juego guardado correctamente');
      onSuccess && onSuccess();
    }
  }; // save game to db

  useEffect(() => {
    getAllGamesData();
  }, []); // fetch all games on mount

  useEffect(() => {
    if (games?.error) {
      toast.error('Error al cargar los juegos');
    }
  }, [games?.error?.message]); // show error if exists

  return { games, handleSaveGame, getAllGamesData };
}
