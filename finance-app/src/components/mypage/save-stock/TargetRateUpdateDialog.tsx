import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Config from '@/configs/config.export';
import { Alert, InputAdornment, Typography } from '@mui/material';
import CustomTextField from '@/components/shared/CustomTextField';

export interface TargetRateIUpdateDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  targetRate: number;
  setTargetRate: React.Dispatch<React.SetStateAction<number>>;
  corpCode: string;
  expectedROE: number;
}

export const TargetRateIUpdateDialog = ({
  open,
  setOpen,
  targetRate,
  setTargetRate,
  corpCode,
  expectedROE,
}: TargetRateIUpdateDialogProps): React.ReactElement => {
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  const [updatedTargetRate, setUpdatedTargetRate] = useState<string>(
    `${targetRate}`,
  );
  const [validationError, setValidationError] = useState<boolean>(false);
  const [isUpdateFail, setIsUpdateFail] = useState(false);

  const handleClose = () => {
    setValidationError(false);
    setIsUpdateFail(false);
    setIsSaveButtonClicked(false);
    setOpen(false);
  };

  const checkValidation = (value: string) => {
    let numberOfTargetRate = Number(value);
    if (
      isNaN(numberOfTargetRate) ||
      numberOfTargetRate <= 0 ||
      numberOfTargetRate >= 100
    ) {
      setValidationError(true);
      return false;
    } else {
      setValidationError(false);
      return true;
    }
  };

  const handleSubmit = () => {
    if (isSaveButtonClicked) {
      return;
    }

    if (!checkValidation(updatedTargetRate)) {
      return;
    }

    const requestUrl = `${Config().baseUrl}/api/corp-info/user`;

    fetch(requestUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        corpCode: corpCode,
        targetRate: Number(updatedTargetRate),
        expectedROE: expectedROE,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setTargetRate(Number(updatedTargetRate));
        } else {
          console.error('Update failed:', response.statusText);
          setIsUpdateFail(true);
        }
      })
      .catch((error) => {
        console.error('Error during Update:', error);
        setIsUpdateFail(true);
      })
      .finally(() => {
        setIsSaveButtonClicked(true);
      });
  };

  const handleTargetRateChange = (value: string) => {
    setUpdatedTargetRate(value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>목표수익률 변경</DialogTitle>
      <DialogContent>
        <DialogContentText>
          목표수익률을 변경한 이후 저장 버튼을 클릭하세요.
          <br /> 변경된 목표수익률은 새로운 투자기준가 계산에 반영됩니다.
        </DialogContentText>
        <CustomTextField
          id="targetRate"
          variant="outlined"
          type="number"
          value={updatedTargetRate}
          error={validationError}
          helperText={
            validationError ? '0 ~ 100 사이의 숫자를 입력해주세요.' : ''
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleTargetRateChange(e.target.value);
            checkValidation(e.target.value);
          }}
          sx={{ mt: 3, width: '100%' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </DialogContent>
      {!isSaveButtonClicked ? (
        <></>
      ) : isUpdateFail ? (
        <Alert variant="outlined" severity="error" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            목표수익률 변경에 실패하였습니다.<div className=""></div>
          </Typography>
        </Alert>
      ) : (
        <Alert variant="outlined" severity="success" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            목표수익률 변경에 성공하였습니다.<div className=""></div>
          </Typography>
        </Alert>
      )}
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </DialogActions>
    </Dialog>
  );
};
