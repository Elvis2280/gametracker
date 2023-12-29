import * as yup from 'yup';
const addGameSchema = yup.object().shape({
  gameTitle: yup.string().required(),
  gameDescription: yup.string(),
  status: yup.string(),
  platforms: yup.string().required(),
  genres: yup.string().required(),
  gamePicture: yup.string().required(),
});

export default addGameSchema;
