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

export interface ExpectedROEUpdateDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  expectedROE: number;
  setExpectedROE: React.Dispatch<React.SetStateAction<number>>;
  corpCode: string;
  targetRate: number;
}

export const ExpectedROEUpdateDialog = ({
  open,
  setOpen,
  expectedROE,
  setExpectedROE,
  corpCode,
  targetRate,
}: ExpectedROEUpdateDialogProps): React.ReactElement => {
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  const [updatedExpectedROE, setUpdatedExpectedROE] = useState<string>(
    `${expectedROE}`,
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
      numberOfTargetRate >= 1
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

    if (!checkValidation(updatedExpectedROE)) {
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
        targetRate: targetRate,
        expectedROE: Number(updatedExpectedROE),
      }),
    })
      .then((response) => {
        if (response.ok) {
          setExpectedROE(Number(updatedExpectedROE));
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

  const handleExpectedROEChange = (value: string) => {
    setUpdatedExpectedROE(value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>예상ROE 변경</DialogTitle>
      <DialogContent>
        <DialogContentText>
          예상ROE를 변경한 이후 저장 버튼을 클릭하세요.
          <br /> 예상ROE의 범위는 0 ~ 1 입니다.
          <br /> 변경된 예상ROE는 기대수익률과 투자기준가 계산에 반영됩니다.
        </DialogContentText>
        <CustomTextField
          id="targetRate"
          variant="outlined"
          type="number"
          value={updatedExpectedROE}
          error={validationError}
          helperText={
            validationError ? '0 ~ 1 사이의 숫자를 입력해주세요.' : ''
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleExpectedROEChange(e.target.value);
            checkValidation(e.target.value);
          }}
          sx={{ mt: 3, width: '100%' }}
        />
      </DialogContent>
      {!isSaveButtonClicked ? (
        <></>
      ) : isUpdateFail ? (
        <Alert variant="outlined" severity="error" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            예상ROE 변경에 실패하였습니다.<div className=""></div>
          </Typography>
        </Alert>
      ) : (
        <Alert variant="outlined" severity="success" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            예상ROE 변경에 성공하였습니다.<div className=""></div>
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
