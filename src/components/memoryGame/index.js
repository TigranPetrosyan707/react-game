import { useEffect, useState } from "react";
import "./style.css";

const cardImages = [
  { src: "/img/hands.png", selected: false },
  { src: "/img/girl.png", selected: false },
  { src: "/img/cloud.png", selected: false },
  { src: "/img/bowl.png", selected: false },
  { src: "/img/monkey.png", selected: false },
  { src: "/img/wood.png", selected: false },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => getMixedCards(), []);

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, selected: true };
            }
            return card;
          });
        });
        resetCards();
      } else {
        setTimeout(() => resetCards(), 1000);
      }
    }
  }, [cardOne, cardTwo]);

  const getMixedCards = () => {
    const mixedCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(mixedCards);
  };

  const resetCards = () => {
    setCardOne(null);
    setCardTwo(null);
    setDisabled(false);
  };

  return (
    <div className="gameContainer">
      <div>
        <button onClick={getMixedCards} className="btn">
          New Game
        </button>
      </div>
      <div className="cardsContainer">
        {cards.map((card) => {
          return (
            <div className="cardContainer">
              <div
                key={card.id}
                className={
                  card === cardOne || card === cardTwo || card.selected
                    ? "inverse"
                    : ""
                }
              >
                <img className="frontCard" src={card.src} alt="front card" />
                <img
                  onClick={() => {
                    if (!disabled) {
                      cardOne ? setCardTwo(card) : setCardOne(card);
                    }
                  }}
                  className="backCard"
                  src="/img/back-part.png"
                  alt="back card"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
