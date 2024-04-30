import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Config from '@/configs/config.export';
import { Alert, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SaveStockInfo } from '@/components/shared/StockInfo';

export interface DeleteSaveStockDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  corpCode: string;
  savedStockInfoList: SaveStockInfo[];
  setSavedStockInfoList: React.Dispatch<React.SetStateAction<SaveStockInfo[]>>;
}

export const DeleteSaveStockDialog = ({
  open,
  setOpen,
  corpCode,
  savedStockInfoList,
  setSavedStockInfoList,
}: DeleteSaveStockDialogProps): React.ReactElement => {
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    if (isDeleteSuccess) {
      const newSavedStockInfoList = savedStockInfoList.filter(
        (stockInfo) => stockInfo.corpCd !== corpCode,
      );
      setSavedStockInfoList(newSavedStockInfoList);
    }
    setIsSaveButtonClicked(false);
    setIsDeleteSuccess(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (isSaveButtonClicked) {
      return;
    }

    const requestUrl = `${Config().baseUrl}/api/corp-info/user`;

    fetch(requestUrl, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        corpCode: corpCode,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsDeleteSuccess(true);
        } else {
          console.error('Delete failed:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error during Delete:', error);
      })
      .finally(() => {
        setIsSaveButtonClicked(true);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>종목 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>
          종목 삭제시 관련된 정보가 모두 삭제됩니다.
          <br /> 삭제하시겠습니까?
        </DialogContentText>
      </DialogContent>
      {isSaveButtonClicked && isDeleteSuccess ? (
        <Alert variant="outlined" severity="success" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            종목 삭제가 성공되었습니다.<div className=""></div>
          </Typography>
        </Alert>
      ) : (
        <></>
      )}
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button onClick={handleSubmit}>삭제</Button>
      </DialogActions>
    </Dialog>
  );
};
