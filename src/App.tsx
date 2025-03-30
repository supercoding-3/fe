import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from '@/router/Router';
import { Loading } from '@/components/pages';
import { userApi } from '@/api';
import { setLogin, setLogout } from '@/redux/reducers/user';

function App() {
  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(true);

  const checkLogin = async () => {
    let timer: NodeJS.Timeout;

    try {
      const response = await userApi.checkLogin();
      dispatch(setLogin(response));
    } catch (error) {
      dispatch(setLogout());
    } finally {
      timer = setTimeout(() => setShowLoading(false), 2000);
    }
    return () => clearTimeout(timer);
  };

  useEffect(() => {
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
