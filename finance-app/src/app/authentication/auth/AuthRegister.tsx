import React, { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import Link from 'next/link';

import { Stack } from '@mui/system';
import CustomTextField from '@/components/shared/CustomTextField';
import Config from '@/configs/config.export';
import { SimpleBackdrop } from '@/components/shared/SimpleBackdrop';

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const [idError, setIdError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repasswordError, setRePasswordError] = useState(false);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [isRegisterFail, setIsRegisterFail] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    setIdError(event.target.value.length < 4);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(!validateEmail(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value.length < 6);
  };

  const handleRePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRePassword(event.target.value);
    setRePasswordError(event.target.value !== password);
  };

  const checkRegisterValidation = () => {
    if (id.length < 4) {
      setIdError(true);
      return false;
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      return false;
    }

    if (password.length < 6) {
      setPasswordError(true);
      return false;
    }

    if (repassword !== password) {
      setRePasswordError(true);
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!checkRegisterValidation()) {
      return;
    }

    const requestUrl = `${Config().baseUrl}/api/register`;
    setOpenBackdrop(true);

    fetch(requestUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        id,
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/authentication/login';
        } else {
          console.error('Register failed:', response.statusText);
          setIsRegisterFail(true);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setIsRegisterFail(true);
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

      <Box>
        {openBackdrop && <SimpleBackdrop />}
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            ID
          </Typography>
          <CustomTextField
            id="id"
            variant="outlined"
            fullWidth
            error={idError}
            helperText={idError ? '아이디는 4자리 이상이어야 합니다.' : ''}
            value={id}
            onChange={handleIdChange}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            error={emailError}
            helperText={emailError ? '이메일 형식으로 입력해주세요.' : ''}
            value={email}
            onChange={handleEmailChange}
          />

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
        </Stack>
        {isRegisterFail && (
          <Alert variant="outlined" severity="error" sx={{ mb: '15px' }}>
            <Typography variant="body2" fontWeight="600">
              중복된 ID 입니다. 다른 ID를 입력해주세요.
            </Typography>
          </Alert>
        )}
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleRegister}
        >
          회원가입
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
