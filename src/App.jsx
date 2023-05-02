import { useState, useEffect } from 'react'
import './App.css'
import useImages from './hooks/useImage';
import Card from './components/Card';
import ScoreTable from './components/ScoreTable';
import CongratulationModal from './components/CongratulationModal';
import WelcomeFormModal from './components/WelcomeFormModal';
import {useUser} from './hooks/useUserData';

function App() {
    const [cards, resetData] = useImages();
    const [uncoveredCards, setUncoveredCards] = useState([])
    const [selectedCards, setSelectedCards] = useState([]);
    const [showAllCards, setShowAllCards] = useState(false);
    const [openFinisherModal, setOpenFinisherModal] = useState(false);
    const [openWelcomeModal, setOpenWelcomeModal] = useState(false);
    const { username } = useUser();
    const [score, setScore] = useState({
      hits: 0,
      misses: 0,
    });

    useEffect(() => {      //check if the user is not registered
      username === '' ? setOpenWelcomeModal(true) : setOpenWelcomeModal(false);
    }, [username]);

    useEffect(() => {         //check if the game is finished
      if (cards.length !== 0) {
        if (cards.length === uncoveredCards.length) {
          setOpenFinisherModal(true)
        }
      }
    },[cards, uncoveredCards, setOpenFinisherModal]);

    const startGame = () => {
      setOpenWelcomeModal(false);
      //show all cards for 1.5 seconds
      setShowAllCards(true);    
      setTimeout(() => {
        setShowAllCards(false);
      }, 1500);
    };

    const addPoint = () => {    //add a point to hits
      setScore({
        ...score,
        hits: score.hits + 1,
      });
    };

    const addMiss = () => {     //add a point to misses
      setScore({
        ...score,
        misses: score.misses + 1,
      });
    };

    const onReset = () => {
      //clean states
      setScore({
        hits: 0,
        misses: 0,
      });
      setUncoveredCards([]);
      setSelectedCards([]);
      setOpenFinisherModal(false);
      setShowAllCards(true);
      resetData();  //reset cards info
      startGame();  //start game
    };

    const handleCardClick = (card) => {
      if (selectedCards.length === 2 || uncoveredCards.includes(card) || selectedCards.includes(card)) {   //check that only 2 cards are selected and that the card is not already uncovered
        return;
      }
      setSelectedCards([...selectedCards, card]); //add card to selected cards

      if (selectedCards.length === 1) {
        if (selectedCards[0].id === card.id) {  //check if the cards are the same and add a point
          addPoint();                           
          setUncoveredCards([...uncoveredCards, selectedCards[0], card]); 
          setSelectedCards([]);                 
        } else {                                //if the cards are not the same add a point to misses
          addMiss();
          setTimeout(() => {
            setSelectedCards([]);
          }, 1000);
        }
      }
    };

    return (
      <div className='AppContainer'>
        <h1 className='HeaderTitle'>Memory Game</h1>
        <div className='AppContainer__body'>
          {cards.map((card) => (
            <Card
              key={card.uuid}
              image={card}
              handleClick={() => handleCardClick(card)}
              showCard={selectedCards.includes(card) || showAllCards || uncoveredCards.includes(card)}
              isVisible={true}
            />
          ))}
        </div>
        <ScoreTable hits={score.hits} misses={score.misses} />
        <CongratulationModal isOpen={openFinisherModal} handleAction={onReset} />
        <WelcomeFormModal isOpen={openWelcomeModal} handleAction={startGame} />
      </div>
    )
}

export default App
