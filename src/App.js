import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/card-1.jpeg", matched: false },
  { "src": "/img/card-2.jpeg", matched: false },
  { "src": "/img/card-3.jpeg", matched: false },
  { "src": "/img/card-4.jpeg", matched: false },
  { "src": "/img/card-5.jpeg", matched: false },
  { "src": "/img/card-6.jpeg", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(5)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //duplicate images
      .sort(() => Math.random() - 0.5) //random pisition
      .map((card) => ({ ...card, id: Math.random() })) //random id 

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(5)
    setScore(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    if (choiceOne.src === choiceTwo.src) {
      setTurns(turns)
      setScore(prevScore => prevScore - 1)
    }
    else { setTurns(prevTurns => prevTurns - 1) }
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <div className="info">
        <button onClick={shuffleCards}>{turns === 0 ? "Game Over. Click to play again!" : (score === 6 ? "Congrats! Click to play again! " : "New Game")}</button>
        <p>Score: {score}</p>
        <p> Turns left: {turns}</p>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            turns={turns}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
