
import { useState, useEffect } from "react";
import { auth, getDb, updateDb, getAllUsers } from "../../utils/firebase/firebase";

import "./main.scss";
import SignOut from "../sign-out/sign-out";
import NavBar from "../nav-bar/nav-bar";




const Main = () => {

  const [userDataDB, setUserDataDB] = useState({});
  const [userUid, setUserUid] = useState("");
  const [amount, setAmount] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [allUsersInfo, setAllUsersInfo] = useState();



  // Check if user is login or not 
  useEffect(() => {
    const sucscribeCheck = auth.onAuthStateChanged(user => {
      if (user) {
        // console.log(user.uid);
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


  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  
  const addAmountToBalance = () => {
    const newBalance = Number(userDataDB.balance) + parseFloat(amount);
    setUserBalance(newBalance);
    updateDb(userUid, { balance: newBalance });
    setAmount('');
  };

  



  return (
    <section className="main">

      <div className="main__container">

        <NavBar/>
        
        
        {userDataDB.displayName ? <h2>Welcome, {userDataDB.displayName}!</h2> : null}
        {userDataDB.balance ? <h2>You are now millionaire, you have {userDataDB.balance}$ !</h2> : null}

        <div>
          <h1>Balance: {userDataDB.balance}</h1>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount to add"
          />
          <button onClick={addAmountToBalance}>Add Amount</button>

          <div>
            <h1>All Users</h1>
            {allUsersInfo ? allUsersInfo.map((user, index) => (
              <div key={index}>
                {user.balance}
                {user.displayName}
                
              </div>
            )) : null}
          </div>
        </div>
        
          <SignOut/>


      </div>

    

      
    </section>
  );
};

export default Main;