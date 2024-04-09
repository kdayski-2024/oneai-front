import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';

import { useTelegram } from '../../hooks/useTelegram';

import Button from '../Button/Button';

import './Header.css';
import CogIcon from '../../img/CogIcon';

const Header = ({ balance }) => {
  const { user, onClose } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();

  const onMain = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      navigate('/payment');
    }
  };
  return (
    <div className={'header'}>
      <div className={'left'}>
        <span onClick={onMain}>
          <CogIcon />
        </span>
        <span>{balance} TON</span>
      </div>
      <div>
        <TonConnectButton className="button_connect" />
      </div>
    </div>
  );
};

export default Header;
