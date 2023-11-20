import { genresTypes, platformsTypes, statusTypes } from '../general/general';

export type gameListResponseDto = {
  id: number;
  created_at: string;
  game_title: string;
  game_description: string;
  game_picture: string;
  status: statusTypes;
  user_id: number;
  platforms: platformsTypes[];
  genres: genresTypes[];
};
