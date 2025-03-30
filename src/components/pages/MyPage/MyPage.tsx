import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import './my-page.scss';
import { Error } from '@/components/pages';
import { UserProfile } from '@/components/features';

const MyPage = () => {
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      setError('사용자 정보를 찾는 중에 오류가 발생했습니다');
    }
  }, []);

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div>
      <UserProfile user={user} />
    </div>
  );
};

export default MyPage;
