import {
  FieldErrors,
  SetFieldValue,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { gamesApiDto, gamesApiResponseDto } from '../responses/gameResponseDto';

export type typeUseApiGame = {
  debounceSearch: (query: string) => void;
  isSearchFetching: boolean;
  searchGamesData: gamesApiResponseDto | undefined;
  handleSelectGame: (gameId: number) => void;
  selectedGame: gamesApiDto | null;
  register: UseFormRegister<gameFields>;
  handleSubmit: UseFormHandleSubmit<gameFields>;
  errors: FieldErrors<gameFields>;
  resetGameSelection: () => void;
};

export type gameFields = {
  gameTitle: string;
  gameDescription?: string | undefined;
  status?: string | undefined;
  platforms: string;
  genres: string;
  gamePicture: string;
};

export type formikGameFieldsTypes = {
  register: UseFormRegister<gameFields>;
  handleSubmit: UseFormHandleSubmit<gameFields>;
  errors: FieldErrors<gameFields>;
  setValue: SetFieldValue<gameFields>;
  getValues: UseFormGetValues<gameFields>;
};
