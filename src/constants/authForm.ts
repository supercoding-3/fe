export const AUTH_FORM_LOGIN = [
  {
    id: 'userEmail',
    label: '이메일',
    type: 'email',
  },
  {
    id: 'userPassword',
    label: '비밀번호',
    type: 'password',
  },
];

export const AUTH_FORM_SIGNUP = [
  {
    id: 'userEmail',
    label: '이메일',
    type: 'email',
  },
  {
    id: 'userPassword',
    label: '비밀번호',
    type: 'password',
  },
  {
    id: 'userNickname',
    label: '닉네임',
    type: 'text',
  },
  {
    id: 'userPhone',
    label: '전화번호',
    type: 'tel',
  },
];

export const AUTH_FORM_PROFILE_EDIT = [
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
  },
  {
    id: 'confirmPassword',
    label: '비밀번호 재확인',
    type: 'password',
  },
  {
    id: 'nickname',
    label: '닉네임',
    type: 'text',
    prevValId: 'userNickname',
  },
  {
    id: 'phoneNumber',
    label: '전화번호',
    type: 'tel',
    prevValId: 'userPhone',
  },
];
