import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Alert,
} from '@mui/material';
import CustomTextField from '@/components/shared/CustomTextField';
import { useRecoilState } from 'recoil';
import { AuthState, IAuthState } from './AuthState';
import Config from '@/configs/config.export';
import { SimpleBackdrop } from '@/components/shared/SimpleBackDrop';

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

interface ILoginResponse {
  id: string;
  email: string;
  role: string;
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [authState, setAuthState] = useRecoilState(AuthState);
  const [rememerMe, setRememberMe] = useState<boolean>(true);
  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [idError, setIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const handleLogin = async () => {
    if (id.length < 1) {
      setIdError(true);
      return;
    }

    if (password.length < 1) {
      setPasswordError(true);
      return;
    }

    setOpenBackdrop(true);
    let requestUrl = `${Config().baseUrl}/api/login`;

    if (rememerMe) {
      requestUrl += '?remember-me=true';
    }

    console.log(id, password);

    fetch(requestUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data: ILoginResponse) => {
            let newAuthState: IAuthState = {
              id: data.id,
              isLogin: true,
              email: data.email,
            };
            setAuthState(newAuthState);
            window.location.href = '/';
          });
        } else {
          setIsLoginFailed(true);
        }
      })
      .catch((error) => {
        setIsLoginFailed(true);
      })
      .finally(() => {
        setOpenBackdrop(false);
      });
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        {openBackdrop && <SimpleBackdrop />}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            ID
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            error={idError}
            helperText={idError ? 'ID를 입력해주세요.' : ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setId(event.target.value);
              setIdError(false);
            }}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            error={passwordError}
            helperText={passwordError ? '비밀번호를 입력해주세요.' : ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
              setPasswordError(false);
            }}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="로그인 상태 유지"
              onChange={() => {
                setRememberMe(!rememerMe);
              }}
            />
          </FormGroup>
          {/* <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            비밀번호 찾기
          </Typography> */}
        </Stack>
      </Stack>
      {isLoginFailed && (
        <Alert variant="outlined" severity="error" sx={{ mb: '15px' }}>
          <Typography variant="body2" fontWeight="600">
            아이디 또는 비밀번호가 일치하지 않습니다.
          </Typography>
        </Alert>
      )}

      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
        >
          로그인
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
