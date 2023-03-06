import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/index'
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
 
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
 
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') 
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


