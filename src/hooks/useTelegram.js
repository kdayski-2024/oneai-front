const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };
  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  const authRequest = async (data) => {
    try {
      const response = await fetch('https://saturn.fanil.ru/auth', {
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
      return responseData;
    } catch (error) {
      throw error;
    }
  };
  return {
    authRequest,
    onToggleButton,
    onClose,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
    userData: tg.initDataUnsafe,
  };
}
