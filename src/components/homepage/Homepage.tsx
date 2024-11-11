import { useFormik } from 'formik';
import { Topics } from '../../types';
import { useAppDispatch } from '../../store/hook';
import { setIsImageLoading, setIsModalVisible, setSearchTopic } from '../../slices/imageSearchSlice';
import { Box, Button, MenuItem, Select, styled, TextField } from '@mui/material';
import { searchImageInitialValues, searchImageValidationSchema } from '../../utils/formik-utils';
import { useEffect } from 'react';
import { getPhotoByQuery } from '../../service/searchImageService';
import ImageModal from './image-modal/ImageModal';

const StyledBox = styled(Box)({
  marginTop: '150px',
  display: 'flex',
  justifyContent: 'center',
});

const StyledForm = styled('form')({
  width: '600px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  'box-shadow': '2px 2px 7px 0px rgba(0,0,0,0.46)',
  '-webkit-box-shadow': '2px 2px 7px 0px rgba(0,0,0,0.46)',
  '-moz-box-shadow': '2px 2px 7px 0px rgba(0,0,0,0.46)',
  padding: '30px',
});

const StyledTextField = styled(TextField)({
  margin: '10px 0',
});

const StyledButton = styled(Button)({
  marginTop: '25px',
  color: 'white',
  backgroundColor: 'black',
  ':hover': {
    backgroundColor: '#222831',
  },
});

const Homepage = () => {
  const dispatch = useAppDispatch();

  const onSubmitForm = (values: any): any => {
    dispatch(setSearchTopic(values.topic === Topics.OTHER ? values.otherTopic : values.topic));
    dispatch(setIsImageLoading(true));
    dispatch(setIsModalVisible(true));
    formik.setStatus('sub');
  };

  const formik = useFormik({
    initialValues: searchImageInitialValues,
    validationSchema: searchImageValidationSchema,
    onSubmit: onSubmitForm,
    enableReinitialize: true,
  });

  const onCloseModal = () => {
    dispatch(setIsModalVisible(false));
    dispatch(setIsImageLoading(false));
    formik.resetForm();
  };

  return (
    <>
      <StyledBox>
        <StyledForm onSubmit={formik.handleSubmit}>
          <StyledTextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={(formik.touched.name && formik.errors.name) || ' '}
            disabled={formik.isSubmitting}
          />
          <StyledTextField
            fullWidth
            id="surname"
            name="surname"
            label="Surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={(formik.touched.surname && formik.errors.surname) || ' '}
            disabled={formik.isSubmitting}
          />
          <StyledTextField
            fullWidth
            id="topic"
            name="topic"
            label="Topic"
            select
            value={formik.values.topic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.topic && Boolean(formik.errors.topic)}
            helperText={(formik.touched.topic && formik.errors.topic) || ' '}
            disabled={formik.isSubmitting}
          >
            {Object.values(Topics).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </StyledTextField>
          {formik.values.topic === Topics.OTHER && (
            <StyledTextField
              fullWidth
              id="otherTopic"
              name="otherTopic"
              label="Other Topic"
              value={formik.values.otherTopic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otherTopic && Boolean(formik.errors.otherTopic)}
              helperText={(formik.touched.otherTopic && formik.errors.otherTopic) || ' '}
              disabled={formik.isSubmitting}
              style={{ marginTop: '10px' }}
            />
          )}
          <StyledButton
            size="medium"
            variant="contained"
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            sx={{ textTransform: 'none' }}
          >
            Search
          </StyledButton>
        </StyledForm>
      </StyledBox>
      <ImageModal onClose={onCloseModal} />
    </>
  );
};

export default Homepage;
