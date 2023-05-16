
import incomeTotals from '../../assets/img/totals/incomeIcon.png';
import outcomeTotals from '../../assets/img/totals/outcomeIcon.png';
import "./totals.scss";


const Totals = ({totalTransactions}) => {

return (
    <div className="totals">

      <div className="totals__income totals__block">
        <img src={incomeTotals} alt="incomeTotals" />
        <div className="totals__wrapper">
          <div className="totals__text">Total Income</div>
          {totalTransactions.totalIncome ? <div className="totals__numbers">${totalTransactions.totalIncome}</div> : null}
        </div>
      </div>

      <div className="totals__outcome totals__block">
        <img src={outcomeTotals} alt="outcomeTotals" />
        <div className="totals__wrapper">
          <div className="totals__text">Total Outcome</div>
          {totalTransactions.totalOutcome ? <div className="totals__numbers">${totalTransactions.totalOutcome}</div> : <div className="totals__numbers">$0</div>}
        </div>
      </div>

    </div>
  );
};

export default Totals;