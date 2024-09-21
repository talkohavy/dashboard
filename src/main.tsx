import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import DarkThemeProvider from './providers/DarkThemeProvider/DarkThemeProvider';

function Client() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <DarkThemeProvider>
          <App />
        </DarkThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(<Client />);
