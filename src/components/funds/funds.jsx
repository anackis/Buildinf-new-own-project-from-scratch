

import "./funds.scss";


const Funds = ({ 
  amount, 
  addAmountToBalance, 
  handleAmountChange, 
  amountToTransfer, 
  handleAmountChangeToTransfer, 
  recipientCardNumber, 
  setRecipientCardNumber, 
  formErrors, 
  transferAmount, 
  recipientCardNumberTouched, 
  setRecipientCardNumberTouched, 
  formSubmitted
}) => {

  return (
    <div className="funds">
      <h2 className="funds__header">Funds Managment</h2>
      <div className="funds__add">
        <h2>Add funds</h2>
        <div className="funds__divider"></div>
        <div className="funds__funds-wrapper">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount to add"
          />
          <button className="funds__funds-button" onClick={addAmountToBalance}>Add Funds</button>
          {formErrors.amount && <div className="error error__add">{formErrors.amount}</div>}
        </div>
        
      </div>
      

      <div className="funds__transaction">
        <h2>Send funds</h2>
        <div className="funds__divider"></div>

        <div className="funds__transaction-wrapper">
          <div className="input-wrapper">
            <input
                  type="number"
                  value={amountToTransfer}
                  onChange={handleAmountChangeToTransfer}
                  placeholder="Enter amount to transfer"
            />
            {formErrors.amountToTransfer && <div className="error">{formErrors.amountToTransfer}</div>}
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              value={recipientCardNumber}
              onChange={(e) => setRecipientCardNumber(e.target.value)}
              onBlur={() => setRecipientCardNumberTouched(true)}
              placeholder="Enter recipient card number"
            />
            {(formSubmitted || recipientCardNumberTouched) && formErrors.recipientCardNumber && (
              <div className="error">{formErrors.recipientCardNumber}</div>
            )}
          </div>
          <button className="funds__funds-button" onClick={transferAmount}>Transfer Funds</button>
        </div>
        
        
      </div>
    </div>
  );
};

export default Funds;


