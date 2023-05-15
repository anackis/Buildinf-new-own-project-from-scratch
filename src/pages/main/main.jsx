
import { useState, useEffect } from "react";

import { auth, getDb, updateDb, getAllUsers, db } from "../../utils/firebase/firebase";

import * as Yup from 'yup';

import {
  collection,
  where,
  query,
  getDocs, 
  onSnapshot
} from 'firebase/firestore';


import NavBar from "../../components/nav-bar/nav-bar";
import UserBlock from "../../components/user-block/user-block";
import Analytics from "../../components/analytics/analytics";
import Totals from "../../components/totals/totals";
import Card from "../../components/card/card";
import Funds from "../../components/funds/funds";
import AllUsers from "../../components/all-users/all-users";
import ComingSoon from "../../components/coming-soon/coming-soon";

import "./main.scss";



const Main = () => {
  const [userDataDB, setUserDataDB] = useState({});
  const [userUid, setUserUid] = useState("");
  const [amount, setAmount] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [allUsersInfo, setAllUsersInfo] = useState([]); 
  const [amountToTransfer, setAmountToTransfer] = useState('');
  const [recipientCardNumber, setRecipientCardNumber] = useState('');
  const [totalTransactions, setTotalTransactions] = useState({totalIncome: "", totalOutcome: ""});

    
  
  // Check if user is login or not 
  // useEffect(() => {
  //   const sucscribeCheck = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       getAllUsers().then((response) => setAllUsersInfo(response))
  //       setUserUid(user.uid)
  //       getDb(user.uid)
  //     .then((response) => setUserDataDB(response))
  //     .catch((error) => console.error('Error fetching data:', error));
  //     } else {
  //       console.log("// User is signed out");
  //     }
  //   });

  //   return sucscribeCheck;
  // }, [userBalance]);


  useEffect(() => {
    const unsubscribeCheck = auth.onAuthStateChanged(user => {
      if (user) {
        const unsubscribeUsers = getAllUsersRealTime(); // listen to changes in user collection
        setUserUid(user.uid);
        getDb(user.uid)
          .then((response) => setUserDataDB(response))
          .catch((error) => console.error('Error fetching data:', error));
        
        // stop listening to changes when the component is unmounted
        return () => {
          unsubscribeCheck();
          unsubscribeUsers();
        };
      } else {
        console.log("// User is signed out");
      }
    });
  }, [userBalance]);



  const getAllUsersRealTime = () => {
    const usersCollection = collection(db, 'users');
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setAllUsersInfo(usersData);
    });
  
    return unsubscribe; // this is used to stop listening to changes
  };



  // Functional for Navbar
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleNavItemClick = (linkName) => {
    setActiveLink(linkName);
  };



  // Functionl for User Block
  const uploadImg = async (imgURL) => {
    await updateDb(userUid, { userImg: imgURL });
    getDb(userUid).then(data => setUserDataDB(data));
  };

 

  // Functional for funds

  const addFundsSchema = Yup.object().shape({
    amount: Yup.number().required('Amount is required').typeError('Amount must be a number').positive('Amount must be a positive number'),
  });
  
  const transferFundsSchema = Yup.object().shape({
    amountToTransfer: Yup.number()
      .required('Amount to transfer is required')
      .typeError('Amount to transfer must be a number')
      .positive('Amount to transfer must be a positive number'),
    recipientCardNumber: Yup.number()
      .required('Recipient card number is required')
      .typeError('Recipient card number must be a number')
      .test('cardNumberExists', 'Recipient card number does not exist', function (value) {
        const { allUsersInfo } = this.parent;
        const recipient = allUsersInfo.find(user => user.cardNumber === parseInt(value));
        return !!recipient;
      }),
  });

  const [formErrors, setFormErrors] = useState({});
  const [recipientCardNumberTouched, setRecipientCardNumberTouched] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleAmountChangeToTransfer = (e) => {
    // setAmountToTransfer(e.target.value);

    setAmountToTransfer(e.target.value);
    transferFundsSchema
      .validate({ amountToTransfer: e.target.value })
      .then(() => setFormErrors({}))
      // .catch((error) => setFormErrors({ amountToTransfer: error.message }));
      .catch((error) => console.log(error.message));
      
  };


  const transferBalanceHistory = () => {
    const newBalanceChanges = [...userDataDB.balance_history, { type: 'outcome', value: parseFloat(amountToTransfer) }];
    updateDb(userUid, { balance_history: newBalanceChanges });
  }


  const transferAmount = async () => {
    // const newBalance = Number(userDataDB.balance) - parseFloat(amountToTransfer);
    // const minusBalance = Number(userDataDB.balance) - parseFloat(amountToTransfer);
    
    // try {

    //   setUserBalance(newBalance);
    //   transferBalanceHistory();
    //   updateDb(userUid, { balance: newBalance });
    //   setAmountToTransfer('');

    //   const recipientSnapshot = await getDocs(
    //     query(
    //       collection(db, 'users'),
    //       where('cardNumber', '==', parseInt(recipientCardNumber))
    //     )
    //   );

    //   const plusBalance = Number(recipientSnapshot.docs[0].data().balance) + parseFloat(amountToTransfer);

    //   // const recipientDoc = recipientSnapshot.docs[0].data();
    //   // console.log(recipientSnapshot.docs[0].data().balance);

    //   const addBalanceHistory = () => {
    //     const newBalanceChanges = [...recipientSnapshot.docs[0].data().balance_history, { type: 'income', value: parseFloat(amountToTransfer) }];
    //     updateDb(recipientSnapshot.docs[0].id, { balance_history: newBalanceChanges });
    //   }
    //   addBalanceHistory();
    //   updateDb(recipientSnapshot.docs[0].id, { balance: plusBalance });
    //   setAmountToTransfer('');

    // } catch (error) {
    //   console.log(`Error: ${error.message}`);
    // }

    setFormSubmitted(true);

    try {
      await transferFundsSchema.validate(
        
        { 
          amountToTransfer, 
          recipientCardNumber,
          allUsersInfo
        },
        { abortEarly: false }
      );

      const newBalance = Number(userDataDB.balance) - parseFloat(amountToTransfer);
      const minusBalance = Number(userDataDB.balance) - parseFloat(amountToTransfer);
    
    try {

      setUserBalance(newBalance);
      transferBalanceHistory();
      updateDb(userUid, { balance: newBalance });
      setAmountToTransfer('');

      const recipientSnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('cardNumber', '==', parseInt(recipientCardNumber))
        )
      );

      const plusBalance = Number(recipientSnapshot.docs[0].data().balance) + parseFloat(amountToTransfer);

      // const recipientDoc = recipientSnapshot.docs[0].data();
      // console.log(recipientSnapshot.docs[0].data().balance);

      const addBalanceHistory = () => {
        const newBalanceChanges = [...recipientSnapshot.docs[0].data().balance_history, { type: 'income', value: parseFloat(amountToTransfer) }];
        updateDb(recipientSnapshot.docs[0].id, { balance_history: newBalanceChanges });
      }
      addBalanceHistory();
      updateDb(recipientSnapshot.docs[0].id, { balance: plusBalance });
      setAmountToTransfer('');
      setRecipientCardNumber('');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    setFormErrors({});
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setFormErrors(validationErrors);
    }
  };
 
  
  const handleAmountChange = (e) => {
    // setAmount(e.target.value);

    setAmount(e.target.value);
    addFundsSchema
      .validate({ amount: e.target.value })
      .then(() => setFormErrors({}))
      .catch((error) => setFormErrors({ amount: error.message }));
      
  };
  

  const addBalanceHistory = () => {
    const newBalanceChanges = [...userDataDB.balance_history, { type: 'income', value: parseFloat(amount) }];
    updateDb(userUid, { balance_history: newBalanceChanges });
  }


  const addAmountToBalance = async  () => {
    // const newBalance = Number(userDataDB.balance) + parseFloat(amount);
    
    // setUserBalance(newBalance);
    // addBalanceHistory();
    // updateDb(userUid, { balance: newBalance });
    // setAmount('');

    try {
      await addFundsSchema.validate({ amount });
        const newBalance = Number(userDataDB.balance) + parseFloat(amount);
      
        setUserBalance(newBalance);
        addBalanceHistory();
        updateDb(userUid, { balance: newBalance });
        setAmount('');
        setFormErrors({});
    } catch (error) {
      setFormErrors({ amount: error.message });
    }

  };


  console.log(formErrors);


  // Functionality for Totals
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
      
      setTotalTransactions({totalIncome: result.income, totalOutcome: result.outcome});
    } catch (error) {
      // console.error("Error processing transactions:", error);
    }
  }


  useEffect(() => {
    processTransactions();
  }, [userDataDB.balance_history])

 

  let activeComponent;
  if (activeLink === 'Dashboard') {
    activeComponent = (
      <>
        <div className="main__wrapper_top">
            <div className="main__content">
              <UserBlock userDataDB={userDataDB} userUid={userUid} uploadImg={uploadImg}/>
              <Totals totalTransactions={totalTransactions}/>
              <Analytics userDataDB={userDataDB}/>
            </div>
            <div className="main__content_right">
              <Card userDataDB={userDataDB} />
              <Funds 
                amount={amount} 
                formErrors={formErrors}
                addAmountToBalance={addAmountToBalance}
                handleAmountChange={handleAmountChange}
                amountToTransfer={amountToTransfer}
                handleAmountChangeToTransfer={handleAmountChangeToTransfer}
                recipientCardNumber={recipientCardNumber}
                setRecipientCardNumber={setRecipientCardNumber}
                transferAmount={transferAmount}
                setRecipientCardNumberTouched={setRecipientCardNumberTouched}
                recipientCardNumberTouched={recipientCardNumberTouched}
                formSubmitted={formSubmitted}
              />
            </div>
          </div>
          <AllUsers allUsersInfo={allUsersInfo} />
      </>
    );
  } else if (activeLink !== 'Dashboard') {
    activeComponent = <ComingSoon />;
  } 



  return (
    <section className="main">
      <div className="main__container">
      
        <NavBar onNavItemClick={handleNavItemClick}/>
        <div className="main__wrapper">
          
          {activeComponent}
        
        </div>
      </div>
    </section>
  );
};

export default Main;