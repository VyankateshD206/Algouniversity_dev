import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App.jsx'
import './index.css';
import 'flowbite';
import {store} from './store/store.js'
createRoot(document.getElementById('root')).render( 
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
