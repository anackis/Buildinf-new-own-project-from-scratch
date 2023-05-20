
import { useState, useEffect, useCallback  } from "react";
import { auth, getDb, updateDb, db } from "../../utils/firebase/firebase";
import * as Yup from 'yup';

import {
  collection,
  where,
  query,
  getDocs, 
  onSnapshot
} from 'firebase/firestore';


import NavBar from "../../components/nav-bar/nav-bar";
import Dashboard from "../../components/dashboard/dashboard";
import ComingSoon from "../../components/coming-soon/coming-soon";

import "./main.scss";


const Main = () => {
  const [userDataDB, setUserDataDB] = useState({});
  const [userUid, setUserUid] = useState("");
  const [amount, setAmount] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [allUsersInfo, setAllUsersInfo] = useState([]); 
  const [amountToTransfer, setAmountToTransfer] = useState("");
  const [recipientCardNumber, setRecipientCardNumber] = useState("");
  const [totalTransactions, setTotalTransactions] = useState({totalIncome: "", totalOutcome: ""});
  const [activeLink, setActiveLink] = useState('Dashboard');
  const [formErrors, setFormErrors] = useState({});
  const [recipientCardNumberTouched, setRecipientCardNumberTouched] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);



  useEffect(() => {
    const unsubscribeCheck = auth.onAuthStateChanged(user => {
      if (user) {
        const unsubscribeUsers = getAllUsersRealTime(); 
        setUserUid(user.uid);
        getDb(user.uid)
          .then((response) => setUserDataDB(response))
          .catch((error) => console.error('Error fetching data:', error));
        
        return () => {
          unsubscribeCheck();
          unsubscribeUsers();
        };
      } else {
        // console.log(" User is signed out");
      }
    });
  }, [userBalance]);



  const getAllUsersRealTime = useCallback(() => {
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
  
    return unsubscribe; 
  }, []);



  // Functional for Navbar
  const handleNavItemClick = useCallback((linkName) => {
    setActiveLink(linkName);
  }, []);



  // Functionl for User Block
  const uploadImg = useCallback(async (imgURL) => {
    await updateDb(userUid, { userImg: imgURL });
    getDb(userUid).then(data => setUserDataDB(data));
  }, [userUid]);

 

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

  
  
  const handleAmountChangeToTransfer = useCallback((e) => {

    setAmountToTransfer(e.target.value);
    transferFundsSchema
      .validate({ amountToTransfer: e.target.value })
      .then(() => setFormErrors({}))
      .catch((error) => console.log(error.message));
      
  }, []);


  const transferBalanceHistory = () => {
    const newBalanceChanges = [...userDataDB.balance_history, { type: 'outcome', value: parseFloat(amountToTransfer) }];
    updateDb(userUid, { balance_history: newBalanceChanges });
  }


  const transferAmount = async () => {
    setFormSubmitted(true);
    setFormErrors("");
  
    try {
      await transferFundsSchema.validate(
        {
          amountToTransfer,
          recipientCardNumber,
          allUsersInfo,
        },
        { abortEarly: false }
      );
  
      const newBalance = Number(userDataDB.balance) - parseFloat(amountToTransfer);
  
      setUserBalance(newBalance);
      transferBalanceHistory();
      updateDb(userUid, { balance: newBalance });
  
      setAmountToTransfer('');
      setRecipientCardNumber('');
  
      const recipientSnapshot = await getDocs(
        query(collection(db, 'users'), where('cardNumber', '==', parseInt(recipientCardNumber)))
      );
  
      const plusBalance = Number(recipientSnapshot.docs[0].data().balance) + parseFloat(amountToTransfer);
      const addBalanceHistory = () => {
        const newBalanceChanges = [...recipientSnapshot.docs[0].data().balance_history, { type: 'income', value: parseFloat(amountToTransfer) }];
        updateDb(recipientSnapshot.docs[0].id, { balance_history: newBalanceChanges });
      };
  
      addBalanceHistory();
      updateDb(recipientSnapshot.docs[0].id, { balance: plusBalance });
    } catch (error) {
      // console.log(`Error: ${error.message}`);
      setFormErrors({});
  
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setFormErrors(validationErrors);
    }
  };
 
  
  const handleAmountChange = (e) => {

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


  const addAmountToBalance = useCallback(async () => {

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

  }, [userDataDB.balance, userBalance, amount, userUid]);




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


  useEffect(() => {
    const processTransactions = async () => {
      try {
        const transactions = await userDataDB.balance_history;
        const result = calculateTotals(transactions);
        setTotalTransactions({totalIncome: result.income, totalOutcome: result.outcome});
      } catch (error) {
      }
    };

    processTransactions();
  }, [userDataDB.balance_history])

 

  let activeComponent;
  if (activeLink === 'Dashboard') {
    activeComponent = (
      <Dashboard
        userDataDB={userDataDB}
        userUid={userUid}
        uploadImg={uploadImg}
        totalTransactions={totalTransactions}
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
        allUsersInfo={allUsersInfo}
      />
    );
  } else if (activeLink !== 'Dashboard') {
    activeComponent = <ComingSoon />;
  } 


  // console.log("rendaer");


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