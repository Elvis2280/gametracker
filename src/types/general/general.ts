export type StatusColor =
  | 'danger'
  | 'warning'
  | 'success'
  | 'primary'
  | 'default'
  | 'secondary'
  | undefined;

export type platformsTypes = 'xbox' | 'deck';

export type genresTypes =
  | 'Action'
  | 'Adventure'
  | 'RPG'
  | 'Simulation'
  | 'Strategy'
  | 'Sports'
  | 'Racing'
  | 'Fighting'
  | 'Horror'
  | 'Puzzle'
  | 'MMORPG'
  | 'Open World';

export type statusTypes = 'Not started' | 'In progress' | 'Completed';

export type gameFieldsTypes = {
  gameTitle: string;
  gameDescription: string;
  status: statusTypes;
  platforms: platformsTypes[];
  genres: genresTypes[];
  gamePicture: string;
};
