import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl="https://saturn.fanil.ru/tonconnect-manifest.json">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TonConnectUIProvider>
);
