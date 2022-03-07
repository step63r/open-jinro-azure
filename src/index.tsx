import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/App';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';
import WaitingRoom from './components/WaitingRoom';
import GamePage from './components/GamePage';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/join' element={<JoinRoom />} />
          <Route path='/create' element={<CreateRoom />} />
          <Route path='/waiting' element={<WaitingRoom />} />
          <Route path='/game' element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
