import React, { useCallback, useEffect, useState } from 'react';

import './MainPage.css';
import Button from '../../components/Button/Button';

import { useTonAddress } from '@tonconnect/ui-react';
import { useTelegram } from '../../hooks/useTelegram';
import RefreshIcon from '../../img/RefreshIcon';

const MainPage = ({ setBalance, setResponse, response }) => {
  const [prompt, setPrompt] = useState('');

  const { tg, queryId } = useTelegram();
  const address = useTonAddress();

  const onSendData = useCallback(async () => {
    const data = {
      queryId,
      message: prompt,
      address,
    };

    try {
      const response = await fetch('https://saturn.fanil.ru/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // throw new Error(JSON.stringify(response));
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const responseData = await response.json();
      setResponse(responseData.answear);
      setBalance(responseData.balance);
      // console.log('Response from server:', responseData);
    } catch (error) {
      setResponse(error.message);
    }
  }, [prompt, queryId, address]);

  // useEffect(() => {
  //   tg.MainButton.setParams({ text: 'Отправить' });
  // }, []);

  // useEffect(() => {
  //   if (!prompt) {
  //     tg.MainButton.hide();
  //   } else {
  //     tg.MainButton.show();
  //   }
  // }, [prompt]);

  const onChangePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const onRefresh = () => {
    setResponse('');
  };

  return (
    <div className={'main_page'}>
      <div className="response_wrapper">
        {response && (
          <div className="icon" onClick={onRefresh}>
            <RefreshIcon />
          </div>
        )}
        <div className="response">{response}</div>
      </div>
      <div className="input_wrapper">
        <input
          className={'input'}
          type="text"
          placeholder="your request"
          value={prompt}
          onChange={onChangePrompt}
        />
        <Button onClick={onSendData}>Send</Button>
      </div>
    </div>
  );
};

export default MainPage;
