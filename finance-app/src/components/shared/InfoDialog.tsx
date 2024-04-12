import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const InfoDialog: React.FC<InfoDialogProps> = ({
  open,
  onClose,
  title,
  content,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
      {title}
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent sx={{ mb: '30px' }}>{content}</DialogContent>
  </Dialog>
);

export default InfoDialog;
