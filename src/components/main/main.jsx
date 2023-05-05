
import { useState, useRef, useEffect } from "react";

import { auth, getDb, updateDb, getAllUsers } from "../../utils/firebase/firebase";

import "./main.scss";
import SignOut from "../sign-out/sign-out";
import NavBar from "../nav-bar/nav-bar";

import cardFront from "../../assets/img/card/card1.svg";
import cardBack from "../../assets/img/card/card2.svg";
import spinCard from "../../assets/img/card/spinCard.png";





const Main = () => {

  const [userDataDB, setUserDataDB] = useState({});
  const [userUid, setUserUid] = useState("");
  const [amount, setAmount] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [allUsersInfo, setAllUsersInfo] = useState(); 
  const [createdAt, setCreatedAt] = useState();
  const [imgURL, setImgURL] = useState('');


    
    

  // Check if user is login or not 
  useEffect(() => {
    const sucscribeCheck = auth.onAuthStateChanged(user => {
      if (user) {
        // console.log(user);
        // console.log("// User is signed in");
        getAllUsers().then((response) => setAllUsersInfo(response))
        setUserUid(user.uid)
        getDb(user.uid)
      .then((response) => setUserDataDB(response))
      .catch((error) => console.error('Error fetching data:', error));
        // setUserUid(user.uid);
      } else {
        console.log("// User is signed out");
        // setUserUid(null);
      }
    });

    return sucscribeCheck;
  }, [userBalance]);



  useEffect(() => {
    if (userDataDB.createdAt) {
      formatTimestamp(userDataDB.createdAt);
      
    } 
  }, [userDataDB.createdAt])

  



  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  
  const addAmountToBalance = () => {
    const newBalance = Number(userDataDB.balance) + parseFloat(amount);
    setUserBalance(newBalance);
    updateDb(userUid, { balance: newBalance });
    setAmount('');
  };







  const [degree, setDegree] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const changeInX = e.clientX - dragStartX.current;
    const newDegree = degree + (changeInX / 2); 
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
      const progress = Math.min(elapsedTime / duration, 1);
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

  

  

  function formatTimestamp({ seconds, nanoseconds }) {
    // Combine seconds and nanoseconds into a single value in milliseconds
    const totalMilliseconds = (seconds * 1000) + (nanoseconds / 1000000);
  
    // Convert the combined value into a Date object
    const date = new Date(totalMilliseconds);
  
    // Format the date as desired
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  
    setCreatedAt(formattedDate);
  }



  const handleImgUploadChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgURL(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }


  const uploadImg = async  () => {
    updateDb(userUid, { userImg: imgURL });
  };

 console.log(allUsersInfo)

  return (
    <section className="main">

      <div className="main__container">

        <NavBar/>

        <div className="main__content">

          <div className="main__user-block">
            {userDataDB.displayName ? <h2>Welcome, {userDataDB.displayName}!</h2> : null}
            {userDataDB.balance ? <h2>Your balance: {userDataDB.balance}$</h2> : null}
            <span>Your card number: </span>{userDataDB.cardNumber}
            <br />
            <span>You created account: </span>{createdAt}
            <img style={{height: "100px"}} src={userDataDB.userImg} alt="userImg" />
            <div>
              <input type="file" onChange={handleImgUploadChange} accept="image/*" />
              <button onClick={uploadImg}>Upload Image</button>

             
            </div>
            
          </div>


          <div className="main__card">
            
            {userDataDB.balance ? <h2>Your balance: {userDataDB.balance}$</h2> : null}
            {userDataDB.cardNumber}
            <div className="main__card__creditcard">
              <div className="main__card__drag"
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDrag}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                <div className="main__card-rotate-front main__card-rotate"
                    style={{
                      transform: `rotateY(${degree}deg)`,
                      zIndex: `${(degree > 90 && degree < 270) || (degree < -90 && degree > -270) ? "-1" : "2"}`,
                    }}
                  >
                  <img src={cardFront} alt="cardFront" />
                </div>

                <div className="main__card-rotate-back main__card-rotate"
                    style={{
                      transform: `rotateY(${degree + 180}deg)`,
                    }}
                  >
                  <img src={cardBack} alt="cardFront" />
                </div>
                
              </div>
              <button onClick={handleButtonClick} className="main__card-rotate-button">
                <img src={spinCard} alt="card-spin" />
              </button>
            </div>
          </div>
          
          

          <div>
            <h1>Balance: {userDataDB.balance}</h1>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount to add"
            />
            <button onClick={addAmountToBalance}>Add to balance</button>

            <div>
              <h1>All Users</h1>
              {allUsersInfo ? allUsersInfo.map((user, index) => (
               
                <div key={index}>
                  {user.displayName}
                  <br />
                  {user.balance}
                  <br />
                  <img style={{height: "100px"}} src={user.userImg} alt="userImg" />
                  
                  
                  
                </div>
              )) : null}
            </div>
          </div>
          
          <SignOut/>

        </div>
      </div>
    </section>
  );
};

export default Main;