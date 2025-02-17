import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Router from '@/router/Router';
import { __fetchUser } from '@/redux/reducers/user';
import { AppDispatch } from '@/redux/store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(__fetchUser());
  }, [dispatch]);

  return (
    <div className="app">
      <Router />
    </div>
  );
}

export default App;
