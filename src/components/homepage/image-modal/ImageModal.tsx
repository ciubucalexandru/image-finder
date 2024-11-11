import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { Box, Button, Modal, Paper, Skeleton, styled } from '@mui/material';
import { setImage, setIsImageLoading, setIsModalVisible } from '../../../slices/imageSearchSlice';
import { getPhotoByQuery } from '../../../service/searchImageService';

const RootBox = styled(Box)({
  maxWidth: '1080px',
  height: '840px',
  backgroundColor: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const ButtonBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginTop: '12px',
});

const RejectButton = styled(Button)({
  width: '45%',
  color: 'black',
  backgroundColor: 'white',
  border: '2px solid #000000',
  ':hover': {
    backgroundColor: '#222831',
    color: 'white',
  },
});

const AcceptButton = styled(Button)({
  width: '45%',
  color: 'white',
  backgroundColor: 'black',
  ':hover': {
    backgroundColor: '#222831',
  },
  ':disabled': {
    backgroundColor: 'gray',
    color: 'white',
  },
});

const CancelButton = styled(Button)({
  width: '93.5%',
  color: 'black',
  backgroundColor: 'white',
  border: '2px solid #000000',
  ':hover': {
    backgroundColor: '#222831',
    color: 'white',
  },
});

type Props = {
  onClose: () => void;
};

const ImageModal: React.FC<Props> = ({ onClose }) => {
  const { isImageLoading, isModalVisible, image, searchTopic } = useAppSelector((state) => state.imageSearch);
  const dispatch = useAppDispatch();

  const onFetchImageSuccess = (image: any) => {
    dispatch(setImage(image));
    dispatch(setIsImageLoading(false));
  };

  const onFetchImageFail = () => {
    dispatch(setIsImageLoading(false));
  };

  const onFetchImage = () => {
    dispatch(setIsImageLoading(true));
    getPhotoByQuery(searchTopic, onFetchImageSuccess, onFetchImageFail);
  };

  const onAccept = () => {};

  useEffect(() => {
    onFetchImage();
  }, []);

  return (
    <Modal open={isModalVisible} onClose={onClose}>
      <RootBox>
        {isImageLoading || !image ? (
          <Skeleton variant="rectangular" animation="pulse" width={1080} height={720} />
        ) : (
          <Paper variant="elevation">
            <img src={image?.urls?.regular} alt={searchTopic} />
          </Paper>
        )}

        <ButtonBox>
          <RejectButton onClick={onFetchImage} disabled={isImageLoading || !image}>
            Reject
          </RejectButton>
          <AcceptButton onClick={onAccept} disabled={isImageLoading || !image}>
            Accept
          </AcceptButton>
        </ButtonBox>
        <ButtonBox>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonBox>
      </RootBox>
    </Modal>
  );
};

export default ImageModal;
