import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'login-persist',
  storage: sessionStorage,
});

export interface IAuthState {
  isLogin: boolean;
  userId: number;
  userName: string;
}

export const AuthState = atom<IAuthState>({
  key: 'AuthState',
  default: { isLogin: false, userId: 0, userName: '' },
  effects_UNSTABLE: [persistAtom],
});
