import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomTextField from '../shared/CustomTextField';
import { useRecoilState } from 'recoil';
import { AuthState, IAuthState } from '@/app/authentication/auth/AuthState';
import Config from '@/configs/config.export';
import { Alert, Typography } from '@mui/material';
import apiEndPoints from '@/api/apiEndPoints';

export interface IEmailUpdateDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EmailUpdateDialog = ({
  open,
  setOpen,
}: IEmailUpdateDialogProps): React.ReactElement => {
  const [authState, setAuthState] = useRecoilState(AuthState);
  const [updatedEmail, setUpdatedEmail] = useState(authState.email);
  const [emailError, setEmailError] = useState(false);

  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  const [isUpdateFail, setIsUpdateFail] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!validateEmail(updatedEmail)) {
      setEmailError(true);
      return;
    }

    const requestUrl = apiEndPoints.updateUserEmail(authState.id);

    fetch(requestUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        id: authState.id,
        email: updatedEmail,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            let newAuthState: IAuthState = {
              id: data.id,
              isLogin: true,
              email: data.email,
            };
            setAuthState(newAuthState);
          });
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedEmail(event.target.value);
    setEmailError(!validateEmail(event.target.value));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>이메일 수정하기</DialogTitle>
      <DialogContent>
        <DialogContentText>
          이메일을 수정한 이후 저장 버튼을 클릭하세요.
        </DialogContentText>
        <CustomTextField
          id="email"
          variant="outlined"
          error={emailError}
          helperText={emailError ? '이메일 형식으로 입력해주세요.' : ''}
          value={updatedEmail}
          onChange={handleEmailChange}
          sx={{ mt: 3, width: '350px' }}
        />
      </DialogContent>
      {!isSaveButtonClicked ? (
        <></>
      ) : isUpdateFail ? (
        <Alert variant="outlined" severity="error" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            이메일 수정에 실패하였습니다<div className=""></div>
          </Typography>
        </Alert>
      ) : (
        <Alert variant="outlined" severity="success" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            이메일 수정에 성공하였습니다.<div className=""></div>
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
