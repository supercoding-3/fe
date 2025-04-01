import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from '@/router/Router';
import { Loading } from '@/components/pages';
import { userApi } from '@/api';
import { setLogin, setLogout } from '@/redux/reducers/user';

function App() {
  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await userApi.checkLogin();
        dispatch(response ? setLogin(response) : setLogout());
      } catch {
        dispatch(setLogout());
      } finally {
        setTimeout(() => setShowLoading(false), 2000);
      }
    };

    checkLogin();
  }, []);

  if (showLoading) return <Loading />;

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
