import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.tsx'
import './index.css'
import store from './store/store.ts';
import './utils/i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <Router>
    <App />
  </Router>
  </Provider>
 ,
)
