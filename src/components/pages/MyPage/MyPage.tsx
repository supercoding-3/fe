import { useEffect, useState } from 'react';
import './my-page.scss';
import { userApi } from '@/api';
import { User } from '@/types';

const MyPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User>({} as User);

  return (
    <div>
      <h1>MyPage</h1>
    </div>
  );
};

export default MyPage;
