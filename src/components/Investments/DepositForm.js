import React, { useContext, useState } from "react";
import { TransactionContext } from "../ReactContext/TransactionContext";
import { Spinner } from "../Spinner";
import "./DepositForm.css";

const DepositForm = () => {
  // const [address, setAddress] = useState("");
  // const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const {
    setDepositAddress,
    setDepositAmount,
    depositAddress,
    depositAmount,
    HandleDeposit,
    maxDeposit,
    minDeposit,
    Approved,
    CheckAlready,
    Invest,
    isLoading,
    error,
    isApproved,
  } = useContext(TransactionContext);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddressChange = (event) => {
    setDepositAddress(event.target.value);
  };

  const handleAmountChange = (event) => {
    setDepositAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    HandleDeposit();

    // Call the deposit function here and pass the `address` and `amount` as arguments
    // Make sure to check if the `amount` is between the minimum and maximum values before calling the function

    // Example logic for checking the minimum and maximum amount
    //  require(init, "Not Started Yet");
    //  require(_amount >= min, "Cannot Deposit");
    //  require(_amount <= max, "Cannot Deposit");

    // if (depositAmount >= minDeposit && depositAmount <= maxDeposit) {
    //   // Call the deposit function here
    //   HandleDeposit();
    // } else {
    //   console.error("Amount must be between the minimum and maximum values");
    // }
  };

  return (
    <div>
      <div>
        {isApproved ? (
          <button onClick={handleShowModal} className="the__buttons">
            Deposit
          </button>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <button className="the__buttons" onClick={() => Approved()}>
                Approve
              </button>
            )}
          </>
        )}
      </div>
      {/* <button onClick={handleShowModal} className="the__buttons">
        Approve
      </button> */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Deposit Fund</h2>
              <span className="close-button" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label className="inputLabel">
                  <h3>Address</h3>
                  <input
                    type="text"
                    placeholder="Address"
                    value={depositAddress}
                    onChange={handleAddressChange}
                  />
                </label>
                <label className="inputLabel">
                  <h3>Amount</h3>
                  <input
                    style={{
                      border: error ? "1px solid red" : "1px solid #ccc",
                    }}
                    type="text"
                    placeholder="Amount"
                    value={depositAmount}
                    onChange={handleAmountChange}
                  />
                  {error && (
                    <div style={{ color: "red", fontSize: "10px" }}>
                      Invalid Amount!
                    </div>
                  )}
                </label>
              </form>
            </div>
            <div className="modal-footer">
              {/* <button onClick={handleCloseModal}>Close</button> */}
              <button
                className="the__modalbutton"
                onClick={() => HandleDeposit()}
              >
                Deposit Fund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositForm;
