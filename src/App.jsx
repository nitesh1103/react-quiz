import { useState, useEffect } from 'react';
import './app.css';
import { data } from './data';
import Timer from './components/Timer';
import Trivia from './components/Trivia';
import Start from './components/Start';

const App = () => {
  const [ username, setUsername ] = useState(null);
  const [ questionNumber, setQuestionNumber ] = useState(1);
  const [ gameOver, setGameOver ] = useState(false);
  const [ earned, setEarned ] = useState('$ 0');

  const moneyPyramid = [
    { id: 1, amount: '$ 100' },
    { id: 2, amount: '$ 200' },
    { id: 3, amount: '$ 300' },
    { id: 4, amount: '$ 500' },
    { id: 5, amount: '$ 1000' },
    { id: 6, amount: '$ 2000' },
    { id: 7, amount: '$ 4000' },
    { id: 8, amount: '$ 8000' },
    { id: 9, amount: '$ 16000' },
    { id: 10, amount: '$ 32000' },
    { id: 11, amount: '$ 64000' },
    { id: 12, amount: '$ 125000' },
    { id: 13, amount: '$ 250000' },
    { id: 14, amount: '$ 500000' },
    { id: 15, amount: '$ 1000000' }
  ].reverse();

  useEffect(() => {
    (questionNumber > 1) && 
    setEarned(moneyPyramid.find((mItem) => mItem.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {
        username ? (
          <>
            <div className="main">
              {
                gameOver ? 
                <>
                  <h1 style={{ marginBottom: 10 }}>{ username }</h1>
                  <h2>You Earned: { earned }</h2> 
                </>
                :
                <>
                  <div className='top'>
                    <div className='timer'>
                      <Timer
                        setGameOver={ setGameOver }
                        questionNumber={ questionNumber }
                      />
                    </div>
                  </div>
                  <div className='bottom'>
                    <Trivia 
                      data={ data }
                      questionNumber={ questionNumber }
                      setQuestionNumber={ setQuestionNumber }
                      setGameOver={ setGameOver }
                    />
                  </div>
                </>
              }
            </div>

            <div className="pyramid">
              <ul className='moneyList'>
                {
                  moneyPyramid.map((moneyItem) => {
                    return (
                      <li
                        key={ moneyItem.id }
                        className={(questionNumber === moneyItem.id) ? 'moneyListItem active' : 'moneyListItem'}
                      >
                        <span className="moneyListItemNum">{ moneyItem.id }</span>
                        <span className="moneyListItemAmount">{ moneyItem.amount }</span>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </>
        )
        :
        <Start setUsername={ setUsername } />
      }
    </div>
  );
}

export default App;
