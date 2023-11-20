import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main
        style={{
          background: '#0D1117',
        }}
        className="dark text-foreground"
      >
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);
