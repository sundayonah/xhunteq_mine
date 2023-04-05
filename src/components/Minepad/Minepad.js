import React, { useContext } from "react";
import "./Minepad.css";
import img2 from "../Rigel__image/eth_red.svg";
import { TransactionContext } from "../ReactContext/TransactionContext";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";


// import ChainAnex from "./ChainAnex";

const Minepad = () => {
  const { currentAccount, maximum, minimum, roi, totalDeposit } =
    useContext(TransactionContext);


  return (
    <div className="Minepad">
      <div className="Minepad__head">
        {/* <p>Acc:{currentAccount}</p> */}
        <h2>MinePad</h2>
        <p>
          lorem10 Include popular icons in your React projects easily with
          react-icons, which utilizes ES6 imports that allows you to include
          only the icons that your project is using.
        </p>
      </div>
      <div className="Minepad__left">
        <div className="Minepad__img">
          <img src={img2} alt="minpad__img" width={500} height={300} />
        </div>
        <div className="Minepad__right">
          <div className="Minepad__right1">
            <h2>ChainAnex Project</h2>
            <p>
              which utilizes ES6 imports that allows you to include only the
              icons that yowhich utilizes ES6 imports that allows you to include
              only the icons that your project is using.
            </p>
          </div>
          <div className="Minepad__right2">
            <span>
              <h3>Volume Locked</h3>
              <p>{totalDeposit} BUSD</p>
            </span>
            <span>
              <h3>Maximum</h3>
              <p>{maximum} BUSD</p>
            </span>
            <span>
              <h3>Minimum</h3>
              <p>{minimum} BUSD</p>
            </span>
            <span>
              <h3>Daily ROI</h3>
              <p>{roi}</p>
            </span>
            {/* <span>
              <h3>Token</h3>
              <p>1 = $0.75</p>
            </span> */}
          </div>

          <button className="the__buttons">
            <a href="/ChainAnex">SEE MORE INFOMATION.</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Minepad;
