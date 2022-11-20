import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import playMusic from '../assets/play.mp3';
import correctMusic from '../assets/correct.mp3';
import wrongMusic from '../assets/wrong.mp3';

const Trivia = ({ data, questionNumber, setQuestionNumber, setGameOver }) => {
  const [ question, setQuestion ] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState(null);
  const [ className, setClassName ] = useState('option');
  const [ isSelected, setIsSelected ] = useState(false);
  const [ sound4Play ] = useSound(playMusic);
  const [ sound4Correct ] = useSound(correctMusic);
  const [ sound4Wrong ] = useSound(wrongMusic);

  // useEffect(() => {
  //   sound4Play();
  // }, [sound4Play]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    sound4Play();
  }, [data, questionNumber, sound4Play]);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    setClassName('option active');
    setIsSelected(true);
    checkCorrect(option);
  };

  const delay = (duration, callback) => {
    return setTimeout(() => {
            callback();
          }, duration);
  };

  const checkCorrect = (option) => {
    delay(1000, () => setClassName(option.correct ? 'option correct' : 'option wrong'));
    delay(2500, () => {
      if( option.correct ) {
        sound4Correct();
        delay(2000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedOption(null);
          setIsSelected(false);
        });
      }
      else {
        sound4Wrong();
        delay(2000, () => {
          setGameOver(true);
        });
      };
    });
  };

  return (
    <div className="trivia">
      <div className="question">{ `${questionNumber}. ${question?.question}` }</div>
      <div className="options">
        {
          question?.options.map((option, i) => (
            <button 
              key={ i }
              disabled={ isSelected }
              onClick={ () => handleOptionSelection(option) }
              className={ (selectedOption === option) ? className : 'option' }
            >
              { option.option }
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default Trivia;