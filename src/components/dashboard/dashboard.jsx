
import { memo } from "react";

import UserBlock from "../user-block/user-block";
import Totals from "../totals/totals";
import Analytics from "../analytics/analytics";
import Card from "../card/card";
import Funds from "../funds/funds";
import AllUsers from "../all-users/all-users";

const Dashboard = memo(({ 
  userDataDB,
  userUid, 
  uploadImg, 
  totalTransactions, 
  amount, 
  formErrors, 
  addAmountToBalance, 
  handleAmountChange, 
  amountToTransfer, 
  handleAmountChangeToTransfer, 
  recipientCardNumber, 
  setRecipientCardNumber, 
  transferAmount, 
  setRecipientCardNumberTouched, 
  recipientCardNumberTouched, 
  formSubmitted, 
  allUsersInfo 
}) => {


  return (
    <>
      <div className="main__wrapper_top">
        <div className="main__content">
          <UserBlock userDataDB={userDataDB} userUid={userUid} uploadImg={uploadImg} />
          <Totals totalTransactions={totalTransactions} />
          <Analytics userDataDB={userDataDB} />
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
});

export default Dashboard;