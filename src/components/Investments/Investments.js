import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Investment.css";
import { RxLapTimer } from "react-icons/rx";
import { FaLink } from "react-icons/fa";
import { TransactionContext } from "../ReactContext/TransactionContext";
import { Spinner } from "../Spinner";
import { FerrisWheelSpinner } from "react-spinner-overlay";
import DepositForm from "./DepositForm";

const Investments = () => {
  const navigate = useNavigate();
  return (
    <div className="investment__head">
      <div className="investment">
        {/* add investment components here */}
        <div className="investment__ul">
          <button
            className="no-border the__buttons"
            onClick={() => navigate("/invest")}
          >
            Investment
          </button>
          <button
            className="no-border the__buttons"
            onClick={() => navigate("static")}
          >
            Statistics
          </button>
          <button
            className="no-border the__buttons"
            onClick={() => navigate("TokenVesting")}
          >
            Token vesting
          </button>
          <button
            className="no-border the__buttons"
            onClick={() => navigate("ReferralMenu")}
          >
            Referral Menu
          </button>
        </div>
      </div>
    </div>
  );
};
export default Investments;

export const Investment = () => {
  const {
    connectWallet,
    currentAccount,
    Approved,
    isLoading,
    congrat,
    handleDeposit,
    walletBalance,
    totalInvest,
  } = useContext(TransactionContext);

  return (
    <div className="investment">
      <div className="wallet">
        <span>
          <h3>Wallet Balance</h3>
          <p>{walletBalance} BUSD</p>
        </span>
        <span>
          <h3>Token Stake</h3>
          <p>{totalInvest} BUSD</p>
        </span>
        {/* {currentAccount ? (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <button className="the__buttons" onClick={() => Approved()}>
                Approve
              </button>
            )}
          </>
        ) : (
        )} */}

        <DepositForm />
      </div>
      <div className="daily__profit">
        <span>
          <h3>Daily ROI Amount</h3>
          <p>NAN/0 BUSD</p>
          <button className="the__buttons">MINE NOW</button>
          <p>
            <RxLapTimer className="rxlap" />
            Next Mine Time:
          </p>
        </span>
        <span>
          <h3>Profit Pool</h3>
          <p>0 BUSD</p>
          <button className="the__buttons">Withdraw Profit</button>
          <p>
            <RxLapTimer className="rxlap" />
            {"  "}
            Next Withdraw Time: (Only 25% of profits allowable):
          </p>
        </span>
      </div>
    </div>
  );
};

// //statistics.....................
// export const Investment = () => {
//   return <div> Investment</div>;
// };
//statistics.....................
export const Statistics = () => {
  return (
    <div className="statistic">
      <div className="statistic__wallet">
        <span>
          <h3>Wallet Balance</h3>
          <p> NaN BUSD</p>
        </span>
        <span>
          <h3>Total Profit Collection</h3>
          <p>BUSD</p>
        </span>
        <span>
          <h3>3X Profit Amount</h3>
          <p>NaN BUSD</p>
        </span>
        <span>
          <h3>3X Profit Remaining</h3>
          <p>NaN BUSD</p>
        </span>
      </div>
      <div className="statistic__wallet">
        <span>
          <h3>Investment Allocation Fee</h3>
          <p>0%</p>
        </span>
        <span>
          <h3>Token Price</h3>
          <p>1 = $0.75</p>
        </span>
        <span>
          <h3>Total Tokens to be recieved</h3>
          <p></p>
        </span>
        <span>
          <h3>Withdrawal Fee</h3>
          <p>0</p>
        </span>
      </div>
      <div className="statistic__wallet">
        <span>
          <h3>Total Withdrawal</h3>
          <p></p>
        </span>
        <span>
          <h3>Total BUSD Deposited</h3>
          <p>BUSD</p>
        </span>
        <span>
          <h3>Listing Price</h3>
          <p>25$</p>
        </span>
      </div>
    </div>
  );
};

//tokenvesting............................
export const TokenVesting = () => {
  return (
    <div className="tokenvesting">
      <div className="token">
        <span>Vesting Period</span>
        <span>Status</span>
        <span>Token Share</span>
        <span>Tokens Locked</span>
        <span>Unlock Time</span>
      </div>
    </div>
  );
};

//referralMenu........................................//
export const ReferralMenu = () => {
  return (
    <div className="ReferralMenu">
      <p>
        <RxLapTimer className="rxlap" />
        {"  "}
        You’ll receive 7% of tokens from your referrals that invest in projects.
      </p>
      <div className="ReferralMenu__wallet">
        <span>
          <h3>Total Withdrawal</h3>
          <p> 0 BUSD</p>
        </span>
        <span>
          <h3>Total Rewards Withdrawn from Referrals</h3>
          <p> O BUSD</p>
        </span>
        <span>
          <h3>.</h3>
          <p>
            <FaLink />
            <a href="/link"> Referral Link</a>
          </p>
        </span>
        <button className="the__buttons">CASHOUT REFERRAL REWARDS</button>
      </div>
    </div>
  );
};
