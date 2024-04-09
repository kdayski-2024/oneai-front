import React, { useCallback, useEffect, useState } from 'react';
import './MainPage.css';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../../components/Button/Button';

const MainPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const { tg, queryId } = useTelegram();

  // const onSendData = useCallback(() => {
  //   const data = {
  //     prompt,
  //   };
  //   tg.sendData(JSON.stringify(data));
  //   console.log(data);
  // }, [prompt]);

  // useEffect(() => {
  //   tg.onEvent('mainButtonClicked', onSendData);
  //   return () => {
  //     tg.offEvent('mainButtonClicked', onSendData);
  //   };
  // });

  const onSendData = useCallback(async () => {
    const data = {
      queryId,
      message: prompt,
    };

    try {
      const response = await fetch('https://saturn.fanil.ru/promt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setResponse(responseData.answear);
      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }, [prompt, queryId]);

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

  return (
    <div className={'main_page'}>
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
      <div className="response_wrapper">
        <div className="response">{response}</div>
      </div>
    </div>
  );
};

export default MainPage;
