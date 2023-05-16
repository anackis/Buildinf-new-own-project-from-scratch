

import { useState, useRef } from "react";

import cardFront from "../../assets/img/card/card1.svg";
import cardBack from "../../assets/img/card/card2.svg";
import spinCard from "../../assets/img/card/spinCard.png";
import "./card.scss";



const Card = ({ userDataDB }) => {

  const [degree, setDegree] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);


  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const
   handleDrag = (e) => {
    if (!isDragging) return;
    const changeInX = e.clientX - dragStartX.current;
    const newDegree = degree + (changeInX / 1); 
    setDegree(newDegree);
    dragStartX.current = e.clientX;
  };


  const handleDragEnd = () => {
    setIsDragging(false);
    (degree > 90 && degree < 270) || (degree < -90 && degree > -270) ? setDegree(180) : setDegree(0);
    
  };


  const smoothRotate = (startDegree, targetDegree, duration) => {

    const startTime = performance.now();
  
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 2);
      const currentDegree = startDegree + (targetDegree - startDegree) * progress;
      setDegree(currentDegree);
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
  
    requestAnimationFrame(animate);
  };
  

  const handleButtonClick = () => {

    const startDegree = degree;
    let targetDegree = "";

    if ((degree > 90 && degree < 270) || (degree < -90 && degree > -270) ? targetDegree = degree + 180 : targetDegree = degree - 180);
    const duration = 500; 

    smoothRotate(startDegree, targetDegree, duration);
  };


  
  return (

    <div className="card">
      <h2>Your Card</h2>
      <div className="card__wrapper">
        <h3>Your balance</h3>
        {userDataDB.balance ? <span className="money">${userDataDB.balance}</span> : null}

        <div className="card__creditcard">
          <div className="card__drag"
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <div className="card-rotate-front"
                style={{
                  transform: `rotateY(${degree}deg)`,
                  zIndex: `${(degree > 90 && degree < 270) || (degree < -90 && degree > -270) ? "-1" : "2"}`,
                }}
            >
              <span className="card__card-number">{userDataDB.cardNumber}</span>
              <span className="card__card-name">{userDataDB.displayName}</span>
              <img src={cardFront} alt="cardFront" />
            </div>
            <div className="card-rotate-back"
              style={{transform: `rotateY(${degree + 180}deg)`}}
            >
              <span className="card__card-number_back">{userDataDB.cardNumberBack}</span>
              <img src={cardBack} alt="cardFront" />
            </div>
          </div>
          <button onClick={handleButtonClick} className="card-rotate-button">
            <img src={spinCard} alt="card-spin" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default Card;