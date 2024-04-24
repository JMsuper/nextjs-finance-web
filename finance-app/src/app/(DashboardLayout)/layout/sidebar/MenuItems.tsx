import { AuthState } from '@/app/authentication/auth/AuthState';
import {
  IconBellPlus,
  IconLayoutDashboard,
  IconListSearch,
  IconLogin,
  IconReport,
  IconSearch,
  IconSettings,
  IconUserPlus,
  IconZoomCode,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';
import { useRecoilState } from 'recoil';

export const NoLoginMenuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: '서비스 소개',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    id: uniqueId(),
    title: '주식 상장사 검색',
    icon: IconSearch,
    href: '/search',
  },
  {
    id: uniqueId(),
    title: '종목 스크리닝',
    icon: IconZoomCode,
    href: '/screening',
  },
  {
    navlabel: true,
    subheader: 'Services',
  },
  {
    id: uniqueId(),
    title: '매수/매도 알리미',
    icon: IconBellPlus,
    href: '/services/alamy',
  },
  {
    id: uniqueId(),
    title: '종목 정보 구독',
    icon: IconReport,
    href: '/services/subscription',
  },
  {
    navlabel: true,
    subheader: 'AUTH',
  },
  {
    id: uniqueId(),
    title: '로그인',
    icon: IconLogin,
    href: '/authentication/login',
  },
  {
    id: uniqueId(),
    title: '회원가입',
    icon: IconUserPlus,
    href: '/authentication/register',
  },
];

export const LoginMenuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: '서비스 소개',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    id: uniqueId(),
    title: '주식 상장사 검색',
    icon: IconSearch,
    href: '/search',
  },
  {
    id: uniqueId(),
    title: '종목 스크리닝',
    icon: IconZoomCode,
    href: '/screening',
  },
  {
    navlabel: true,
    subheader: 'Services',
  },
  {
    id: uniqueId(),
    title: '매수/매도 알리미',
    icon: IconBellPlus,
    href: '/services/alamy',
  },
  {
    id: uniqueId(),
    title: '종목 정보 구독',
    icon: IconReport,
    href: '/services/subscription',
  },
  {
    navlabel: true,
    subheader: 'MY PAGE',
  },
  {
    id: uniqueId(),
    title: '저장 종목조회',
    icon: IconListSearch,
    href: '/mypage/search-save-stock',
  },
  {
    id: uniqueId(),
    title: '알리미/구독 관리',
    icon: IconSettings,
    href: '/mypage/services-management',
  },
];
