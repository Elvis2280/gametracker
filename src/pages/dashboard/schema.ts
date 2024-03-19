import * as yup from 'yup';
const addGameSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().required(),
  platforms: yup.string().required(),
  tags: yup.string().required(),
  image: yup.string().required(),
  score: yup.number().required(),
});

export default addGameSchema;
