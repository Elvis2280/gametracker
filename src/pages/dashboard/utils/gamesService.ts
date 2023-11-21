import { gameFieldsTypes } from '../../../types/general/general';
import supabase from '../../../utils/databaseClient';

export const getAllGames = async (userId: string) => {
  if (!userId) throw new Error('User id is required');

  const games = await supabase
    .from('game')
    .select('*')
    .filter('user_id', 'eq', userId);

  return games;
};

export const saveGame = async (game: gameFieldsTypes, userId: string) => {
  if (!game || !userId) throw new Error('Game and user id are required');

  const gameSaved = await supabase
    .from('game')
    .insert({ ...game, user_id: userId });
  return gameSaved;
};

export const getAvatarLetter = (name: string) => {
  return name.charAt(0).toUpperCase();
};
