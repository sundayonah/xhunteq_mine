import React, { useContext } from "react";
import "./Header.css";
import { FiSun } from "react-icons/fi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { MdCastConnected } from "react-icons/md";
import { TransactionContext } from "../ReactContext/TransactionContext";

const Header = () => {
  const { connectWallet, currentAccount, isLoading } =
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
          <button
          // onClick={() => connectWallet()}
          >
            Connected <MdCastConnected />
          </button>
        ) : (
          <button onClick={() => connectWallet()}>
            Connect WAllet <MdCastConnected />
          </button>
        )}

        <RxDragHandleDots2 className="imconnect" />
        <FiSun className="fisun" />
      </div>
    </div>
  );
};

export default Header;
