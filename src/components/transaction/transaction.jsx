import React, { useState } from 'react';
import { auth, getDb, updateDb, getAllUsers, db } from "../../utils/firebase/firebase";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';




const Transaction = (props) => {
  const [amount, setAmount] = useState('');
  const [recipientCardNumber, setRecipientCardNumber] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const handleTransfer = async () => {
    // Reset error message
    // setErrorMessage('');
  
    // // Validate input
    // if (!amount || !recipientCardNumber) {
    //   setErrorMessage('Please provide amount and recipient card number.');
    //   return;
    // }
  
    try {
      // Get the recipient's user document from Firestore
      const recipientSnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('cardNumber', '==', parseInt(recipientCardNumber))
        )
      );
  
      // if (recipientSnapshot.empty) {
      //   setErrorMessage('Recipient not found.');
      //   return;
      // }
  
      // Get the current user's user document from Firestore
      // Replace "currentUserUID" with the current user's UID from Firebase Auth
      const currentUserUID = props.userId;
      const userSnapshot = await doc(db, 'users', currentUserUID);
  
      const userDoc = (await getDocs(userSnapshot)).docs[0].data();
      const recipientDoc = recipientSnapshot.docs[0].data();
  
      // Check if the user has enough balance
      // if (userDoc.balance < parseFloat(amount)) {
      //   setErrorMessage('Insufficient balance.');
      //   return;
      // }

      // console.log(userDoc);
      console.log(recipientDoc);
  
      // Create a batch to perform the transaction atomically
      // const batch = writeBatch(db);
  
      // // Update the user's balance
      // batch.update(doc(db, 'users', currentUserUID), {
      //   balance: userDoc.balance - parseFloat(amount),
      // });
  
      // // Update the recipient's balance
      // batch.update(doc(db, 'users', recipientSnapshot.docs[0].id), {
      //   balance: recipientDoc.balance + parseFloat(amount),
      // });
  
      // // Commit the batch
      // await batch.commit();
      // setAmount('');
      // setRecipientCardNumber('');
    } catch (error) {
      // setErrorMessage(`Error: ${error.message}`);
      console.log(`Error: ${error.message}`);
    }
  };

  
  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <input
        type="number"
        value={recipientCardNumber}
        onChange={(e) => setRecipientCardNumber(e.target.value)}
        placeholder="Enter recipient card number"
      />
      <button onClick={handleTransfer}>Transfer</button>
      {/* {errorMessage && <p>{errorMessage}</p>} */}
    </div>
  );
};

export default Transaction;