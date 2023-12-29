import { Key } from 'react';
import { gameFieldsTypes } from '@/types/general/general';
import { gameStatus, tabStatus } from '@/utils/constants';
import supabase from '@/utils/databaseClient';

type gamesQueryParams = {
  userId: string;
  query: {
    status: Key;
  };
};

export const getAllGames = async ({ userId, query }: gamesQueryParams) => {
  if (!userId) throw new Error('User id is required');

  if (query.status === tabStatus.active) {
    const games = await supabase
      .from('game')
      .select('*')
      .filter('user_id', 'eq', userId)
      .neq('status', gameStatus.completed);
    return games;
  } else {
    const games = await supabase
      .from('game')
      .select('*')
      .filter('user_id', 'eq', userId)
      .eq('status', gameStatus.completed);

    return games;
  }
};

export const saveGame = async (game: gameFieldsTypes, userId: string) => {
  if (!game || !userId) throw new Error('Game and user id are required');

  const gameSaved = await supabase
    .from('game')
    // eslint-disable-next-line camelcase
    .insert({ ...game, user_id: userId });

  return gameSaved;
};

export const searchGameByTitle = async (title: string, userId: string) => {
  if (!title || !userId) throw new Error('Title and user id are required');

  const game = await supabase
    .from('game')
    .select('*')
    .filter('user_id', 'eq', userId)
    .ilike('game_title', `%${title}%`);

  return game;
};

export const deleteGame = async (gameId: number) => {
  if (!gameId) throw new Error('Game id is required');

  const deleteGame = await supabase.from('game').delete().match({ id: gameId });

  return deleteGame;
};

export const getAvatarLetter = (name: string) => {
  return name.charAt(0).toUpperCase();
};
