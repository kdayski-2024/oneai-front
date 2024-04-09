import React, { useState } from 'react';
// import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTonAddress } from '@tonconnect/ui-react';

import './PaymentPage.css';
import Button from '../../components/Button/Button';
import makeid from '../../lib/hashGenerate';
import { useTelegram } from '../../hooks/useTelegram';

// const transaction = {
//   messages: [
//     {
//       address: 'EQAcrEZfup8chh3RooUPriGpwE5va41oOCtVA0Z_feFT-INn', // destination address
//       amount: '10000000', //Toncoin in nanotons
//     },
//   ],
// };

const PaymentPage = ({ setBalance }) => {
  const { queryId } = useTelegram();
  const address = useTonAddress();
  const [error, setError] = useState('');
  // const [loader, setLoader] = useState(false);
  // const [tonConnectUI, setOptions] = useTonConnectUI();

  // setOptions({
  //   network: {
  //     type: 'testnet',
  //   },
  // });
  const paymentTon = async (amount) => {
    const data = {
      queryId,
      hash: makeid(40),
      amount: `${amount}`,
      address,
    };

    try {
      const response = await fetch('https://saturn.fanil.ru/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const responseData = await response.json();
      setBalance(responseData.balance);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="payment-page">
      <div className="button-wrapper">
        <Button onClick={() => paymentTon(10000000)}>+0.01 TON</Button>
        <Button onClick={() => paymentTon(100000000)}>+0.1 TON</Button>
        <Button onClick={() => paymentTon(1000000000)}>+1 TON</Button>
        <Button onClick={() => paymentTon(10000000000)}>+10 TON</Button>
      </div>
      <div style={{ color: 'red' }}>{error}</div>
    </div>
  );
};

export default PaymentPage;
