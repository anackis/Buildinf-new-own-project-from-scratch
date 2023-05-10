
import { useState, useRef, useEffect } from "react";

import { auth, getDb, updateDb, getAllUsers } from "../../utils/firebase/firebase";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  

  const [amountToTransfer, setAmountToTransfer] = useState('');

    
    

  // Check if user is login or not 
  useEffect(() => {
    const sucscribeCheck = auth.onAuthStateChanged(user => {
      if (user) {
        getAllUsers().then((response) => setAllUsersInfo(response))
        setUserUid(user.uid)
        getDb(user.uid)
      .then((response) => setUserDataDB(response))
      .catch((error) => console.error('Error fetching data:', error));
      } else {
        console.log("// User is signed out");
      }
    });

    return sucscribeCheck;
  }, [userBalance]);




  useEffect(() => {
    if (userDataDB.createdAt) {
      formatTimestamp(userDataDB.createdAt);
    } 
  }, [userDataDB.createdAt])

 
 

  const handleAmountChangeToTransfer = (e) => {
    setAmountToTransfer(e.target.value);
  };

  const transferBalanceHistory = () => {
    const newBalanceChanges = [...userDataDB.balance_history, { type: 'outcome', value: parseFloat(amountToTransfer) }];
    updateDb(userUid, { balance_history: newBalanceChanges });
  }

  const transferAmount = () => {
    const newBalance = Number(userDataDB.balance) - parseFloat(amountToTransfer);
    
    setUserBalance(newBalance);
    transferBalanceHistory();
    updateDb(userUid, { balance: newBalance });
    setAmountToTransfer('');
  };
  
 
 





  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  
  const addBalanceHistory = () => {
    const newBalanceChanges = [...userDataDB.balance_history, { type: 'income', value: parseFloat(amount) }];
    updateDb(userUid, { balance_history: newBalanceChanges });
  }


  const addAmountToBalance = () => {
    const newBalance = Number(userDataDB.balance) + parseFloat(amount);
    
    setUserBalance(newBalance);
    addBalanceHistory();
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
    const totalMilliseconds = (seconds * 1000) + (nanoseconds / 1000000);
    const date = new Date(totalMilliseconds);
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




  const colors = {
    income: 'green',
    outcome: 'red',
  };

  

  const [totalTransactions, setTotalTransactions] = useState({totalIncome: "", totalOutcome: ""});

  function calculateTotals(transactions) {
    const totals = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.value;
        } else if (transaction.type === "outcome") {
          acc.outcome += transaction.value;
        }
        return acc;
      },
      { income: 0, outcome: 0 }
    );
  
    return totals;
  }

  async function processTransactions() {
    try {
      const transactions = await userDataDB.balance_history;
      const result = calculateTotals(transactions);
      
      // console.log("Total income:", result.income); // Output: Total income: 450
      // console.log("Total outcome:", result.outcome); // Output: Total outcome: 80
      setTotalTransactions({totalIncome: result.income, totalOutcome: result.outcome});
    } catch (error) {
      // console.error("Error processing transactions:", error);
    }
  }

  useEffect(() => {
    processTransactions();
  }, [userDataDB.balance_history])



  const showId = () => {
    console.log(allUsersInfo[0].uid);
  }
  
 



  




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
            <br />
            {userDataDB.cardNumberBack}
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

            <h1>Balance: {userDataDB.balance}</h1>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount to add"
            />
            <button onClick={addAmountToBalance}>Add to balance</button>
          </div>
          
          

          <div className="main__all-users">
            
            <div>
              <h1>All Users</h1>
              {allUsersInfo ? allUsersInfo.map((user, index) => (
               
                <div key={index}>
                  {user.displayName}
                  <br />
                  {user.cardNumber}
                  <br />
                  {user.balance}
                  <br />
                  <img style={{height: "100px"}} src={user.userImg} alt="userImg" />

                  <input
                    type="number"
                    value={amountToTransfer}
                    onChange={handleAmountChangeToTransfer}
                    placeholder="Enter amount to transfer"
                  />
                  <button onClick={transferAmount}>Transfer</button>
                  <button onClick={showId}>Show Id</button>
                  
                </div>
              )) : null}
            </div>
          </div>

          <div className="main__analytics">
            
            <BarChart
              width={500}
              height={300}
              data={userDataDB.balance_history}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="" /> */}
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              {/* <Bar dataKey="added" fill="#00BBFF" />
              <Bar dataKey="send" fill="#FF0021" /> */}
              <Bar dataKey="value">
              {userDataDB.balance_history ? userDataDB.balance_history.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.type]} />
                
              )) : null}
              </Bar>
            </BarChart>

            <div className="main__analytics__total-income">
              {totalTransactions.totalIncome ? totalTransactions.totalIncome : null}
            </div>
            <div className="main__analytics__total-outcome">
              {totalTransactions.totalOutcome ? totalTransactions.totalOutcome : null}
            </div>
            

          </div>
          
          <SignOut/>
          
        </div>
      </div>
    </section>
  );
};

export default Main;