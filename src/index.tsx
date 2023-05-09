import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './Store/store'
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
      domain='dev-j5yx0w-e.us.auth0.com'
      clientId='tMBIoDwuV0rP5JmdInvqrcZEs2Tu5Glt'
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://internship-example.com"
      }}>
        <BrowserRouter>
         <App />
        </BrowserRouter>
     </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
