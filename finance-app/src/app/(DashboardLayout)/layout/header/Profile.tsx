import React, { useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons-react';
import Config from '@/configs/config.export';
import { useRecoilState } from 'recoil';
import { AuthState, IAuthState } from '@/app/authentication/auth/AuthState';
import { handleLogout } from '@/utils/eventHandler';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [authState, setAuthState] = useRecoilState(AuthState);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      {authState.isLogin ? (
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '200px',
            },
          }}
        >
          <MenuItem>
            <ListItemIcon
              onClick={() => {
                window.location.href = '/mypage/user-info';
              }}
            >
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>내 정보</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon
              onClick={() => {
                window.location.href = '/mypage/save-stock';
              }}
            >
              <IconListCheck width={20} />
            </ListItemIcon>
            <ListItemText>관심종목 관리</ListItemText>
          </MenuItem>
          <Box mt={1} py={1} px={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => {
                handleLogout({ setAuthState });
              }}
            >
              로그아웃
            </Button>
          </Box>
        </Menu>
      ) : (
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '200px',
            },
          }}
        >
          <Box mt={1} py={1} px={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              href="/authentication/login"
              component={Link}
            >
              로그인
            </Button>
          </Box>
          <Box mt={1} py={1} px={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              href="/authentication/register"
              component={Link}
            >
              회원가입
            </Button>
          </Box>
        </Menu>
      )}
    </Box>
  );
};

export default Profile;
