import { useDispatch } from 'react-redux';
import { getAuthStatus } from './services/authStorage';
import { setLogin } from './redux/reducers/user';
import Router from './router/Router';

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = getAuthStatus();

  if (isAuthenticated) {
    dispatch(setLogin('true'));
  }

  console.log(process.env.REACT_APP_ENDPOINT);

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
