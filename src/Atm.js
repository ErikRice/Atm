import React from 'react';
import './App.css';
import {useState} from 'react';

const Atm = ({ onChange, isDeposit, validTransaction }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  const isValid = validTransaction;
  console.log("valid:", isValid);
  return (
    <label className="transaction-type">
      <h3 className="transaction"> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState("");
  const [validTransaction, setValidTransaction] = useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if (Number(event.target.value) <= 0) {
      setValidTransaction(false);
      console.log("condition:", validTransaction);
      return;
    }
    if (atmMode === "Cash Back" && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else  setValidTransaction(true);
    setDeposit(Number(event.target.value));
  };
  
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    if (event.target.value === "Deposit") {
      setIsDeposit(true);
      setAtmMode("Deposit");
    } else if (event.target.value === "Cash Back") {
      setIsDeposit(false);
      setAtmMode("Cash Back");
    } else {setAtmMode("")}
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total" className="account-total">{status}</h2>
      <label className="prompt">Select an action below to continue</label>
      <br></br>
      <select className="dropdown-select" onChange={(e)=> handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {
      atmMode && <Atm onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction}></Atm>
      }
    </form>
  );
};

export default Account;