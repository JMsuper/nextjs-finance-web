import {
  IconBellPlus,
  IconHistory,
  IconLayoutDashboard,
  IconListSearch,
  IconLogin,
  IconReport,
  IconSearch,
  IconUserEdit,
  IconUserPlus,
  IconZoomCode,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

export const NoLoginMenuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: '서비스 소개',
    icon: IconLayoutDashboard,
    href: '/services/introduction',
  },
  {
    id: uniqueId(),
    title: '주식 상장사 검색',
    icon: IconSearch,
    href: '/',
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
    title: '주가 알리미',
    icon: IconBellPlus,
    href: '/services/alamy',
  },
  {
    id: uniqueId(),
    title: '신규 공시 구독',
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
    href: '/services/introduction',
  },
  {
    id: uniqueId(),
    title: '주식 상장사 검색',
    icon: IconSearch,
    href: '/',
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
    title: '주가 알리미',
    icon: IconBellPlus,
    href: '/services/alamy',
  },
  {
    id: uniqueId(),
    title: '신규 공시 구독',
    icon: IconReport,
    href: '/services/subscription',
  },
  {
    id: uniqueId(),
    title: '알림 기록 조회',
    icon: IconHistory,
    href: '/services/history',
  },
  {
    navlabel: true,
    subheader: 'MY PAGE',
  },
  {
    id: uniqueId(),
    title: '관심종목',
    icon: IconListSearch,
    href: '/mypage/save-stock',
  },
  {
    id: uniqueId(),
    title: '내 정보',
    icon: IconUserEdit,
    href: '/mypage/user-info',
  },
];
