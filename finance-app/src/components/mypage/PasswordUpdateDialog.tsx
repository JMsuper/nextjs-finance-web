import React, { useState } from 'react';
import Button from '@mui/material/Button';
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

export interface IPasswordUpdateDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PasswordUpdateDialog = ({
  open,
  setOpen,
}: IPasswordUpdateDialogProps): React.ReactElement => {
  const [authState, setAuthState] = useRecoilState(AuthState);

  const [password, setPassword] = React.useState('');
  const [repassword, setRePassword] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [repasswordError, setRePasswordError] = useState(false);

  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  const [isUpdateFail, setIsUpdateFail] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    if (password !== repassword) {
      setRePasswordError(true);
      return;
    }

    const requestUrl = apiEndPoints.updateUserPassword(authState.id);

    fetch(requestUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        id: authState.id,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleRePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRePassword(event.target.value);
    setRePasswordError(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>비밀번호 변경하기</DialogTitle>
      <DialogContent>
        <DialogContentText mb="10px">
          새로운 비밀번호를 입력하고 저장 버튼을 눌러주세요.
        </DialogContentText>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
          mt="25px"
        >
          Password
        </Typography>
        <CustomTextField
          id="password"
          variant="outlined"
          type="password"
          fullWidth
          error={passwordError}
          helperText={
            passwordError ? '비밀번호는 6자리 이상이어야 합니다.' : ''
          }
          value={password}
          onChange={handlePasswordChange}
        />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
          mt="25px"
        >
          Password Check
        </Typography>
        <CustomTextField
          id="password-check"
          variant="outlined"
          type="password"
          fullWidth
          error={repasswordError}
          helperText={repasswordError ? '비밀번호가 일치하지 않습니다.' : ''}
          value={repassword}
          onChange={handleRePasswordChange}
        />
      </DialogContent>
      {!isSaveButtonClicked ? (
        <></>
      ) : isUpdateFail ? (
        <Alert variant="outlined" severity="error" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            비밀번호 변경에 실패하였습니다<div className=""></div>
          </Typography>
        </Alert>
      ) : (
        <Alert variant="outlined" severity="success" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            비밀번호 변경에 성공하였습니다.<div className=""></div>
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
