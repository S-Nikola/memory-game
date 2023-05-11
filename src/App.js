import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImagesLvlOne = [
  {"src": "memory-game/img/helmet-1.png", matched: false},
  {"src": "memory-game/img/potion-1.png", matched: false},
  {"src": "memory-game/img/ring-1.png", matched: false},
  {"src": "memory-game/img/scroll-1.png", matched: false},
  {"src": "memory-game/img/shield-1.png", matched: false},
  {"src": "memory-game/img/sword-1.png", matched: false},
]

const cardImagesLvlTwo = [
  {"src": "memory-game/img/helmet-1.png", matched: false},
  {"src": "memory-game/img/potion-1.png", matched: false},
  {"src": "memory-game/img/ring-1.png", matched: false},
  {"src": "memory-game/img/scroll-1.png", matched: false},
  {"src": "memory-game/img/shield-1.png", matched: false},
  {"src": "memory-game/img/sword-1.png", matched: false},
  {"src": "memory-game/img/axe-1.png", matched: false},
  {"src": "memory-game/img/bag-1.png", matched: false},
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState (0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCardsLvlOne = () => {
    const shuffledCards = [...cardImagesLvlOne, ...cardImagesLvlOne]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  const shuffleCardsLvlTwo = () => {
    const shuffledCards = [...cardImagesLvlTwo, ...cardImagesLvlTwo]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // handle a match
  useEffect (() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    }
    else {
      setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start a new game automatically 
  useEffect (() => {
    shuffleCardsLvlOne()
  }, [])

  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCardsLvlOne}>Level One</button>
      <button onClick={shuffleCardsLvlTwo}>Level Two</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
