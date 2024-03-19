import { StatusColor } from '../types/general/general';

export const statusList = ['Not started', 'In progress', 'Completed'];

export const platformList = ['xbox', 'deck', 'playstation', 'pc'];

export const statusColor: Record<string, StatusColor> = {
  'Not started': 'danger',
  'In progress': 'warning',
  Completed: 'success',
};

export const gameGenres = [
  'Action',
  'Adventure',
  'RPG',
  'Simulation',
  'Strategy',
  'Sports',
  'Racing',
  'Fighting',
  'Horror',
  'Puzzle',
  'MMORPG',
  'Open World',
];

export const tabStatus = {
  active: 'active',
  completed: 'completed',
};

export const gameStatus = {
  notStarted: 'Not started',
  inProgress: 'In progress',
  completed: 'Completed',
};
