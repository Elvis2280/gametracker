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

export default function useGameData() {
  const [games, setGames] = useState<gamesType | null>(null);
  const { session } = useSession();

  useEffect(() => {
    (async () => {
      const allGames = await getAllGames(session?.user?.id ?? '');
      setGames(allGames);
    })();
  }, []);

  useEffect(() => {
    if (games?.error) {
      toast.error('Error al cargar los juegos');
    }
  }, [games?.error?.message]);

  const handleSaveGame = async (data: gameFieldsTypes) => {
    const newGame = await saveGame(data, session?.user?.id ?? '');
    if (newGame.error) {
      toast.error('Error al guardar el juego');
    } else {
      setGames((prevState: any) => {
        if (prevState?.data) {
          return {
            ...prevState,
            data: [...prevState.data, newGame.data],
          };
        }
        return prevState;
      });
      toast.success('Juego guardado correctamente');
    }
  };

  return { games, handleSaveGame };
}
