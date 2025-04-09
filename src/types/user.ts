export interface AuthForm {
  userEmail: string;
  userPassword: string;
  userNickname?: string;
  userPhone?: string;
}

export interface User {
  profileImageUrl: string | null;
  userCreatedAt: string;
  userEmail: string;
  userId: number;
  userIsDeleted: boolean;
  userNickname: string;
  userPassword: string;
  userPhone: string;
  userUpdatedAt: string;
}

export interface ProfileEditForm {
  password?: string;
  confirmPassword?: string;
  nickname?: string;
  phoneNumber?: string;
}
