import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTonAddress, TonConnectButton } from '@tonconnect/ui-react';

import './App.css';

import { useTelegram } from './hooks/useTelegram';

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';

function App() {
  const { userData, queryId, tg, authRequest } = useTelegram();
  const [response, setResponse] = useState('');

  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const address = useTonAddress();
  // const [cnt, setCnt] = useState(0);
  const [requestWaiting, setRequestWaiting] = useState(false);

  const onSendData = useCallback(async () => {
    setRequestWaiting(true);
    userData.user.address = address;
    const data = {
      queryId,
      data: userData,
    };

    try {
      const response = await authRequest(data);
      setBalance(response.user.balance);
    } catch (error) {
      setError(error.message);
    }
    setRequestWaiting(false);
  }, [address]);

  useEffect(() => {
    onSendData().then(() => tg.ready());
  }, [address]);

  return (
    <div className="App">
      {address ? (
        <>
          <Header balance={balance} />
          <Routes>
            <Route
              index
              element={
                <MainPage
                  response={response}
                  setResponse={setResponse}
                  setBalance={setBalance}
                />
              }
            />
            <Route
              path="payment"
              element={<PaymentPage setBalance={setBalance} />}
            />
          </Routes>
        </>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TonConnectButton />
        </div>
      )}
      {/* {error && (
        <div
          style={{
            color: 'red',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {error}
        </div>
      )} */}
    </div>
  );
}

export default App;
