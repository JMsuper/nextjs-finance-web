import { IAuthState } from '@/app/authentication/auth/AuthState';
import apiEndPoints from '@/api/apiEndPoints';
import Config from '@/configs/config.export';

export interface ILogoutProps {
  setAuthState: (authState: IAuthState) => void;
}

export const handleLogout = ({ setAuthState }: ILogoutProps) => {
  fetch(apiEndPoints.logout(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => {
      if (res.ok) {
        let newAuthState: IAuthState = {
          isLogin: false,
          id: '',
          email: '',
        };
        setAuthState(newAuthState);
        window.location.href = '/authentication/login';
      }
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
};
