import { useEffect, useState } from 'react';
import supabase from '../../../utils/databaseClient';
import { toast } from 'react-toastify';
import { PostgrestError } from '@supabase/supabase-js';
import { gameListResponseDto } from '../../../types/responses/gameResponseDto';

type gamesType = {
  data: gameListResponseDto[] | null;
  error: PostgrestError | null;
};

export default function useGameData() {
  const [games, setGames] = useState<gamesType | null>(null);

  useEffect(() => {
    const getGames = async () => {
      const { data, error }: gamesType = await supabase
        .from('game')
        .select('*');
      setGames({ data, error });
    };

    getGames();
  }, []);

  useEffect(() => {
    if (games?.error) {
      toast.error('Error al cargar los juegos');
    }
  }, [games?.error?.message]);

  return { games };
}
