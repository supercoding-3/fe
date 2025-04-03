import './user-profile.scss';
import profilePlaceholder from '@/assets/images/placeholder-profile.jpeg';
import { User } from '@/types';
import { Button } from '@/components/ui';

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="user-profile">
      <img
        src={user.profileImageUrl ?? profilePlaceholder}
        alt="profile"
        className="user-profile__img"
      />
      <div className="user-info">
        <p className="user-info__nickname">{user.userNickname}</p>
        <p className="user-info__email">{user.userEmail}</p>
      </div>
      {/* TODO: 프로필 수정 */}
      <Button isFull={false} type="button">
        프로필 수정
      </Button>
    </div>
  );
};

export default UserProfile;
