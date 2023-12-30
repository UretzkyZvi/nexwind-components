import { useState } from 'react';

const useClipboard = (timeout = 2000) => {
  const [saved, setSaved] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setSaved(true);
        setTimeout(() => setSaved(false), timeout);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  return { saved, copyToClipboard };
};

export default useClipboard;
