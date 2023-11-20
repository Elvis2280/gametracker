import { StatusColor } from '../types/general/general';

export const statusList = ['Not started', 'In progress', 'Completed'];

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
