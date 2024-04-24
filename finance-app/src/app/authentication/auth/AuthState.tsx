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
  id: string;
  email: string;
}

export const AuthState = atom<IAuthState>({
  key: 'AuthState',
  default: { isLogin: false, id: '', email: '' },
  effects_UNSTABLE: [persistAtom],
});
