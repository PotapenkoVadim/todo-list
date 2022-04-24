import ReactDOM from 'react-dom/client';
import App from './views/app';
import './views/styles/index.scss';

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(<App />);
