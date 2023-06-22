import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import success from './sound/success.wav';
import match from './sound/match.wav';

const cardImagesLvlOne = [
  {"src": "img/helmet-1.png", matched: false},
  {"src": "img/potion-1.png", matched: false},
  {"src": "img/ring-1.png", matched: false},
  {"src": "img/scroll-1.png", matched: false},
  {"src": "img/shield-1.png", matched: false},
  {"src": "img/sword-1.png", matched: false},
]

const cardImagesLvlTwo = [
  {"src": "img/helmet-1.png", matched: false},
  {"src": "img/potion-1.png", matched: false},
  {"src": "img/ring-1.png", matched: false},
  {"src": "img/scroll-1.png", matched: false},
  {"src": "img/shield-1.png", matched: false},
  {"src": "img/sword-1.png", matched: false},
  {"src": "img/axe-1.png", matched: false},
  {"src": "img/bag-1.png", matched: false},
]

const cardImagesLvlThree = [
  {"src": "img/helmet-1.png", matched: false},
  {"src": "img/potion-1.png", matched: false},
  {"src": "img/ring-1.png", matched: false},
  {"src": "img/scroll-1.png", matched: false},
  {"src": "img/shield-1.png", matched: false},
  {"src": "img/sword-1.png", matched: false},
  {"src": "img/axe-1.png", matched: false},
  {"src": "img/bag-1.png", matched: false},
  {"src": "img/book-1.png", matched: false},
  {"src": "img/bow-1.png", matched: false},
  {"src": "img/candle-1.png", matched: false},
  {"src": "img/coins-1.png", matched: false},
]

const cardImagesLvlFour = [
  {"src": "img/helmet-1.png", matched: false},
  {"src": "img/potion-1.png", matched: false},
  {"src": "img/ring-1.png", matched: false},
  {"src": "img/scroll-1.png", matched: false},
  {"src": "img/shield-1.png", matched: false},
  {"src": "img/sword-1.png", matched: false},
  {"src": "img/axe-1.png", matched: false},
  {"src": "img/bag-1.png", matched: false},
  {"src": "img/book-1.png", matched: false},
  {"src": "img/bow-1.png", matched: false},
  {"src": "img/candle-1.png", matched: false},
  {"src": "img/coins-1.png", matched: false},
  {"src": "img/hat-1.png", matched: false},
  {"src": "img/quill-1.png", matched: false},
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

// handle a match
useEffect (() => {

  //sound effect for matching
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

// success sound effects
useEffect(() => {
  if (matchedCount === cards.length) {
    if (soundEnabled) {
      const successSound = new Audio(success);
      successSound.play();
    } 
  }
}, [matchedCount, cards.length, soundEnabled]);

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
      <button onClick={shuffleCardsLvlOne}>Level 1</button>
      <button onClick={shuffleCardsLvlTwo}>Level 2</button>
      <button onClick={shuffleCardsLvlThree}>Level 3</button>
      <button onClick={shuffleCardsLvlFour}>Level 4</button>
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
