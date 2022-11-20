import { useState, useEffect } from 'react';

const Timer = ({ setGameOver, questionNumber }) => {
  const [ timer, setTimer ] = useState(60);

  useEffect(() => {
    if( timer < 0 || questionNumber > 15 ) return setGameOver(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, questionNumber, setGameOver]);

  useEffect(() => {
    setTimer(60);
  }, [questionNumber]);

  return timer;
};

export default Timer;