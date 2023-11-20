import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import App from './app';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main
        style={{
          background: '#0D1117',
        }}
        className="dark text-foreground"
      >
        <ToastContainer />
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);
