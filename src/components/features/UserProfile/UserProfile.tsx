import { useRef, useState } from 'react';
import { MdAddAPhoto, MdModeEdit } from 'react-icons/md';
import './user-profile.scss';
import profilePlaceholder from '@/assets/images/placeholder-profile.jpeg';
import { Error } from '@/components/pages';
import { Button } from '@/components/ui';
import { UserProfileEditModal } from '@/components/features';
import { userApi } from '@/api';
import { User } from '@/types';
import { formatPhoneNumber } from '@/utils';

const UserProfile = ({ user }: { user: User }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const profileImage = e.target.files?.[0];
    if (!profileImage) return;

    const formData = new FormData();
    formData.append('newImage', profileImage);

    try {
      userApi.uploadImage(formData);
      window.location.reload();
    } catch (error) {
      setErrorMessage('프로필 사진 업로드 중에 오류가 발생했습니다');
    }
  };

  if (errorMessage) {
    return <Error errorMessage={errorMessage} />;
  }

  return (
    <>
      <div className="user-profile">
        <img
          src={user.profileImageUrl ?? profilePlaceholder}
          alt="profile"
          className="user-profile__img"
        />
        <div className="user-info">
          <p className="user-info__nickname">{user.userNickname}</p>
          <p className="user-info__email">{user.userEmail}</p>
          <p className="user-info__phone">
            {formatPhoneNumber(user.userPhone)}
          </p>
        </div>
        <div className="button-group">
          <Button type="button" onClick={handleUploadClick}>
            <MdAddAPhoto />
            프로필 사진 업로드
          </Button>
          <input
            className="button-group__input"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button type="button" onClick={() => setModalOpen(true)}>
            <MdModeEdit />
            개인정보 수정
          </Button>
        </div>
      </div>
      <UserProfileEditModal
        show={modalOpen}
        setShow={setModalOpen}
        prevUserInfo={user}
      />
    </>
  );
};

export default UserProfile;
