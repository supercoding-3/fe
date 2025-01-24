import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './App';
import './scss/main.scss';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
