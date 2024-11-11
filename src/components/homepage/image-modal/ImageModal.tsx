import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { Box, Button, Modal, Paper, Skeleton, styled } from '@mui/material';
import { setImage, setIsImageLoading, setIsSearchModalVisible } from '../../../slices/imageSearchSlice';
import { getPhotoByQuery } from '../../../service/searchImageService';
import { setImageThumbnail, setIsCardModalVisible } from '../../../slices/cardViewSlice';

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
  const { isImageLoading, isSearchModalVisible, image, searchTopic } = useAppSelector(
    (state) => state.imageSearch,
  );
  const dispatch = useAppDispatch();

  const onFetchImageSuccess = (image: any) => {
    dispatch(setIsImageLoading(false));
    dispatch(setImage(image));
  };

  const onFetchImageFail = () => {
    dispatch(setIsImageLoading(false));
  };

  const onFetchImage = () => {
    dispatch(setIsImageLoading(true));
    getPhotoByQuery(searchTopic, onFetchImageSuccess, onFetchImageFail);
  };

  const onAccept = () => {
    dispatch(setIsSearchModalVisible(false));
    dispatch(setImageThumbnail(image.urls.thumb));
    dispatch(setIsCardModalVisible(true));
    onClose();
  };

  return (
    <Modal open={isSearchModalVisible} onClose={onClose}>
      <RootBox>
        {isImageLoading || !image ? (
          <Skeleton variant="rectangular" animation="wave" width={1080} height={720} />
        ) : (
          <Paper variant="elevation">
            <img src={image?.urls?.regular} alt={searchTopic} style={{ maxHeight: 720 }} />
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
