import * as yup from 'yup';
const addGameSchema = yup.object().shape({
  game_title: yup.string().required(),
  game_description: yup.string(),
  status: yup.string(),
  platforms: yup.string().required(),
  genres: yup.string().required(),
  game_picture: yup.string().required(),
});

export default addGameSchema;
