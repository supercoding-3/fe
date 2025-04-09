import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import './user-profile.scss';
import profilePlaceholder from '@/assets/images/placeholder-profile.jpeg';
import { Button } from '@/components/ui';
import { UserProfileEditModal } from '@/components/features';
import { User } from '@/types';
import { formatPhoneNumber } from '@/utils';

const UserProfile = ({ user }: { user: User }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
        <Button isFull={false} type="button" onClick={() => setModalOpen(true)}>
          <MdModeEdit />
          프로필 수정
        </Button>
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
