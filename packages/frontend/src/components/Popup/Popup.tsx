import { Box, Modal, SxProps } from '@mui/material';
import React from 'react';
const style = {
  position: 'absolute' as 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
};
const Popup: React.FC<{
  dialogId: string;
  children: React.ReactNode;
  open: boolean;
  close: React.MouseEventHandler<HTMLButtonElement>;
  width?: { xs: string; lg: string; sm: string };
  sx?: SxProps;
}> = ({ dialogId, children, open, close, width = { xs: '90%', lg: '30%', sm: '60%' }, sx = {} }) => {
  return (
    <Modal open={open} onClose={close} id={dialogId} disableAutoFocus>
      <Box sx={{ ...style, width: width, ...sx }}>{children}</Box>
    </Modal>
  );
};
export default Popup;
