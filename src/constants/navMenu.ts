import { IconType } from 'react-icons';
import {
  BsChatDotsFill,
  BsFillHouseDoorFill,
  BsFillPatchPlusFill,
  BsPersonCircle,
} from 'react-icons/bs';

export type NavMenuItem = {
  id: string;
  name: string;
  path: string;
  icon: IconType;
};

export const NAV_MENU: NavMenuItem[] = [
  {
    id: 'home',
    name: '홈',
    path: '/',
    icon: BsFillHouseDoorFill,
  },
  {
    id: 'chat',
    name: '채팅',
    path: '/chat',
    icon: BsChatDotsFill,
  },
  {
    id: 'create',
    name: '상품 등록',
    path: '/product/create',
    icon: BsFillPatchPlusFill,
  },
  {
    id: 'mypage',
    name: '마이페이지',
    path: '/mypage',
    icon: BsPersonCircle,
  },
];
