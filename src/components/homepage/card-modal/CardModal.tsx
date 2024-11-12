import React from 'react';
import { useAppSelector } from '../../../store/hook';
import { Card, CardContent, CardMedia, Modal, styled, Typography } from '@mui/material';

const RootCard = styled(Card)({
  width: '200px',
  backgroundColor: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
});

const StyleTypo = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

type Props = {
  onClose: () => void;
};

const CardModal: React.FC<Props> = ({ onClose }) => {
  const { name, surname, imageThumbnail, isCardModalVisible } = useAppSelector((state) => state.cardView);

  return (
    <Modal open={isCardModalVisible} onClose={onClose}>
      <RootCard>
        <CardMedia component="img" width="200px" image={imageThumbnail} />
        <CardContent>
          <StyleTypo variant="h6">{name}</StyleTypo>
          <StyleTypo variant="h6">{surname}</StyleTypo>
        </CardContent>
      </RootCard>
    </Modal>
  );
};

export default CardModal;
