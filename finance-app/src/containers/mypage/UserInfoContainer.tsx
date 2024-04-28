import React, { useState } from 'react';
import { Grid, TextField, Button, Box, Stack, Typography } from '@mui/material';
import CustomTextField from '@/components/shared/CustomTextField';
import { SimpleBackdrop } from '@/components/shared/SimpleBackDrop';
import { useRecoilState } from 'recoil';
import { AuthState } from '@/app/authentication/auth/AuthState';
import { EmailUpdateDialog } from '@/components/mypage/EmailUpdateDialog';
import { PasswordUpdateDialog } from '@/components/mypage/PasswordUpdateDialog';

const UserInfoContainer: React.FC = () => {
  const [authState, setAuthState] = useRecoilState(AuthState);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openEmailUpdateDialog, setOpenEmailUpdateDialog] = useState(false);
  const [openPasswordUpdateDialog, setOpenPasswordUpdateDialog] =
    useState(false);

  return (
    <Box>
      {openBackdrop && <SimpleBackdrop />}
      {openEmailUpdateDialog && (
        <EmailUpdateDialog
          open={openEmailUpdateDialog}
          setOpen={setOpenEmailUpdateDialog}
        />
      )}
      {openPasswordUpdateDialog && (
        <PasswordUpdateDialog
          open={openPasswordUpdateDialog}
          setOpen={setOpenPasswordUpdateDialog}
        />
      )}

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
          value={authState.id}
          readonly
          sx={{ width: '400px' }}
        />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="5px"
          mt="25px"
        >
          Email
        </Typography>
        <CustomTextField
          id="email"
          variant="outlined"
          value={authState.email}
          sx={{ width: '400px' }}
          readonly
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            setOpenEmailUpdateDialog(true);
          }}
          sx={{ width: '400px', mt: '10px' }}
        >
          이메일 수정하기
        </Button>

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
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            setOpenPasswordUpdateDialog(true);
          }}
          sx={{ width: '400px', mt: '10px' }}
        >
          비밀번호 변경하기
        </Button>
      </Stack>
    </Box>
  );
};

export default UserInfoContainer;
