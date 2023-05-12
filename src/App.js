import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import success from './sound/success.wav';
import match from './sound/match.wav';

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

const cardImagesLvlThree = [
  {"src": "memory-game/img/helmet-1.png", matched: false},
  {"src": "memory-game/img/potion-1.png", matched: false},
  {"src": "memory-game/img/ring-1.png", matched: false},
  {"src": "memory-game/img/scroll-1.png", matched: false},
  {"src": "memory-game/img/shield-1.png", matched: false},
  {"src": "memory-game/img/sword-1.png", matched: false},
  {"src": "memory-game/img/axe-1.png", matched: false},
  {"src": "memory-game/img/bag-1.png", matched: false},
  {"src": "memory-game/img/book-1.png", matched: false},
  {"src": "memory-game/img/bow-1.png", matched: false},
  {"src": "memory-game/img/candle-1.png", matched: false},
  {"src": "memory-game/img/coins-1.png", matched: false},
]

const cardImagesLvlFour = [
  {"src": "memory-game/img/helmet-1.png", matched: false},
  {"src": "memory-game/img/potion-1.png", matched: false},
  {"src": "memory-game/img/ring-1.png", matched: false},
  {"src": "memory-game/img/scroll-1.png", matched: false},
  {"src": "memory-game/img/shield-1.png", matched: false},
  {"src": "memory-game/img/sword-1.png", matched: false},
  {"src": "memory-game/img/axe-1.png", matched: false},
  {"src": "memory-game/img/bag-1.png", matched: false},
  {"src": "memory-game/img/book-1.png", matched: false},
  {"src": "memory-game/img/bow-1.png", matched: false},
  {"src": "memory-game/img/candle-1.png", matched: false},
  {"src": "memory-game/img/coins-1.png", matched: false},
  {"src": "memory-game/img/hat-1.png", matched: false},
  {"src": "memory-game/img/quill-1.png", matched: false},
]



function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState (0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

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

  const shuffleCardsLvlThree = () => {
    const shuffledCards = [...cardImagesLvlThree, ...cardImagesLvlThree]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  const shuffleCardsLvlFour = () => {
    const shuffledCards = [...cardImagesLvlFour, ...cardImagesLvlFour]
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

// sound effects
useEffect(() => {
  if (matchedCount === cards.length) {
    if (soundEnabled) {
      const successSound = new Audio(success);
      successSound.play();
    } 
  }
}, [matchedCount, cards.length, soundEnabled]);

// handle a match
useEffect (() => {

  //sound effect fir matching
  function matchSound () {
    if (soundEnabled) {
      const matchSound = new Audio(match);
      matchSound.play();
    }
  }
  //handling the match
  if (choiceOne && choiceTwo) {
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            matchSound()
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      setMatchedCount(prevCount => prevCount + 2);
      resetTurn()
    }
    else {
      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo, soundEnabled])

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
      <button onClick={() => setSoundEnabled(!soundEnabled)}>
        {soundEnabled ? 'Disable Sound' : 'Enable Sound'}
      </button>
      <br />
      <button onClick={shuffleCardsLvlOne}>Level One</button>
      <button onClick={shuffleCardsLvlTwo}>Level Two</button>
      <button onClick={shuffleCardsLvlThree}>Level Three</button>
      <button onClick={shuffleCardsLvlFour}>Level Four</button>
      <br />
      <p>Turns: {turns}</p>

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
    </div>
  );
}

export default App;
