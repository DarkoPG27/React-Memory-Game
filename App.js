import { useState } from 'react';
import './App.css';

const cardImages = [
  { "src": "/img/card-1.jpeg" },
  { "src": "/img/card-2.jpeg" },
  { "src": "/img/card-3.jpeg" },
  { "src": "/img/card-4.jpeg" },
  { "src": "/img/card-5.jpeg" },
  { "src": "/img/card-6.jpeg" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //duplicate images
      .sort(() => Math.random() - 0.5) //random pisition
      .map((card) => ({ ...card, id: Math.random() })) //random id 

    setCards(shuffledCards)
    setTurns(0)
  }
  console.log(cards, turns)



  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src="/img/card-cover.jpeg" alt="card back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
