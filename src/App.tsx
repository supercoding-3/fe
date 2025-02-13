import { useDispatch } from 'react-redux';
import Router from '@/router/Router';
import { setLogin } from '@/redux/reducers/user';
import { getAuthStatus } from '@/services/authStorage';

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = getAuthStatus();

  if (isAuthenticated) {
    dispatch(setLogin('true'));
  }

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
