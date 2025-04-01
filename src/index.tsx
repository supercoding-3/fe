import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.scss';
import App from './App';

const container = document.getElementById('root') as HTMLElement;

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
