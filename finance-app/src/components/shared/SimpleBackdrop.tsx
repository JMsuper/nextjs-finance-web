import { Backdrop, CircularProgress } from '@mui/material';
import { useState } from 'react';

export const SimpleBackdrop = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
