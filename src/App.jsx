import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import { useTelegram } from './hooks/useTelegram';

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';

const tg = window.Telegram.WebApp;

function App() {
  const { onToggleButton } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
