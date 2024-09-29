import apiEndPoints from '@/api/apiEndPoints';
import Config from '@/configs/config.export';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';

interface SaveTargetPriceDialogProps {
  open: boolean;
  onClose: () => void;
  prop: ICreateTargetPriceAlarm;
}

const SaveTargetPriceDialog: React.FC<SaveTargetPriceDialogProps> = ({
  open,
  onClose,
  prop,
}) => {
  const handleSaveButtonClick = (prop: ICreateTargetPriceAlarm) => {
    fetch(apiEndPoints.createTargetPriceAlarm(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prop),
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          enqueueSnackbar('목표가 포착 알림이 등록되었습니다', {
            variant: 'info',
          });
        } else {
          enqueueSnackbar('목표가 포착 알림 등록에 실패하였습니다', {
            variant: 'error',
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar('목표가 포착 알림 등록에 실패하였습니다', {
          variant: 'error',
        });
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>등록 확인</DialogTitle>
      <DialogContent>
        <strong>목표가 포착 알림</strong>을 등록하시겠습니까? <br />
        알림 메일은 회원정보에 등록된 이메일로 발송됩니다.
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleSaveButtonClick(prop);
            onClose();
          }}
          color="primary"
        >
          예
        </Button>
        <Button onClick={onClose} color="primary">
          아니오
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveTargetPriceDialog;
