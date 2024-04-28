import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined;

export const authKeyName = 'login-persist';

const { persistAtom } = recoilPersist({
  key: authKeyName,
  storage: localStorage,
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
