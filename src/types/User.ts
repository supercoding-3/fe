export interface User {
  id: number;
  nickname: string;
  email: string;
  profileUrl: string;
  phone: string;
}

export interface UserState {
  isLogin: boolean;
  user: User | null;
}
