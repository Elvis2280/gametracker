import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import App from './app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <main
            style={{
              background: '#0D1117 ',
            }}
            className="dark text-foreground "
          >
            <ToastContainer theme="dark" />
            <App />
          </main>
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
