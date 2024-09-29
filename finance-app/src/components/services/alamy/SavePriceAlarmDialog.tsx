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

interface SavePriceAlarmDialogProps {
  open: boolean;
  onClose: () => void;
  prop: ICreatePriceAlarm;
}

const SavePriceAlarmDialog: React.FC<SavePriceAlarmDialogProps> = ({
  open,
  onClose,
  prop,
}) => {
  const handleSaveButtonClick = (prop: ICreatePriceAlarm) => {
    fetch(apiEndPoints.createPriceAlarm(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prop),
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          enqueueSnackbar('[주가 정기 알림] 이 등록되었습니다', {
            variant: 'info',
          });
        } else {
          enqueueSnackbar('[주가 정기 알림] 등록에 실패하였습니다', {
            variant: 'error',
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar('[주가 정기 알림] 등록에 실패하였습니다', {
          variant: 'error',
        });
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>등록 확인</DialogTitle>
      <DialogContent>
        <strong>주가 정기 알림</strong>을 등록하시겠습니까? <br />
        알림 메일은 회원정보에 등록된 이메일로 발송됩니다. <br />
        실제 주가정보와 20분 시차가 존재할 수 있습니다.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          아니오
        </Button>
        <Button
          onClick={() => {
            handleSaveButtonClick(prop);
            onClose();
          }}
          color="primary"
        >
          예
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SavePriceAlarmDialog;
