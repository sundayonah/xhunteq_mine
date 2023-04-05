import React, { useContext } from "react";
import "./Header.css";
import { FiSun } from "react-icons/fi";

import { RxDragHandleDots2 } from "react-icons/rx";
import { MdCastConnected } from "react-icons/md";
import { TransactionContext } from "../ReactContext/TransactionContext";
import ChainAnex from "../Minepad/ChainAnex";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConnectWallets from "../Header/connectWallet/ConnetWallets";

export const Header = () => {
  const { connectWallet, currentAccount, isLoading, accountBal, address } =
    useContext(TransactionContext);

  return (
    <div className="Header">
      <div className="Header__left">
        <div className="header__logo">
          <h2>xhunTeQ.</h2>
        </div>
        <div className="Header__dapps">DAPPS</div>
        <div className="Header__ul">
          <ul>
            <li a href="/">
              Projects
            </li>
            <li a href="/">
              RigelNfts
            </li>
            <li a href="/">
              NFTPad
            </li>
            <li a href="/">
              MinePad
            </li>
          </ul>
        </div>
      </div>
      <div className="Header__right">
        {/* //Connect metamsk, and otherothers...........................*/}

        {currentAccount ? (
          <button className="connect" onClick={() => connectWallet()}>
            <h4> {accountBal} BNB </h4>
            <h4 className="address"> {address}</h4>
            {/* <MdCastConnected /> */}
          </button>
        ) : (
          <button onClick={() => connectWallet()}>
            Connect WAllet <MdCastConnected />
            {/* <ConnectWallets />; */}
          </button>
        )}

        <RxDragHandleDots2 className="imconnect" />
        <FiSun className="fisun" />
      </div>
      {/* <Router>
        <Routes>
          <Route path="chainanex" element={<ChainAnex />} />
        </Routes>
      </Router> */}
    </div>
  );
};
