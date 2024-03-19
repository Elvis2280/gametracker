import {
  FieldErrors,
  SetFieldValue,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

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
