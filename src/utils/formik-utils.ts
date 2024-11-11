import * as yup from 'yup';
import { Topics } from '../types';

export const searchImageValidationSchema = yup.object({
  name: yup.string().min(2, 'Name should be at least two character long').required('Name is required'),
  surname: yup
    .string()
    .min(2, 'Surname should be at least two characters long')
    .required('Surname is required'),
  topic: yup.string().required().oneOf(Object.values(Topics)),
  otherTopic: yup.string().when('topic', {
    is: Topics.OTHER,
    then: (schema) =>
      schema.min(3, 'Topic should be at least three characters long').required('This field is required'),
  }),
});

export const searchImageInitialValues = {
  name: '',
  surname: '',
  topic: '',
  otherTopic: '',
};
