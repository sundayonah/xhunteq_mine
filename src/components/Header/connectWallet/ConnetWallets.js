import React, { useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Minepad from "../../Minepad/Minepad";
import Modal from "react-modal";
import "./connectWallet.css";
// import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

Modal.setAppElement("#root");
const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Tech Mine",
      infuraId: {
        3: "https://mainnet.infura.io/v3/3dee9eb2e10b4651905899b25e947551",
      },
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "https://mainnet.infura.io/v3/3dee9eb2e10b4651905899b25e947551",
    },
  },
};

const ConnectWallets = () => {
  const [account, setAccount] = useState("");
  const [web3ModalProvider, setweb3ModalProvider] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
        theme: "dark",
      });
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      if (web3Provider) {
        setweb3ModalProvider(web3Provider);
      }
      const accounts = await web3Provider.listAccounts();
      setAccount(accounts[0]);
      console.log(web3Provider, "web3");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
    return;
  }
  function disconnectWallet() {
    setweb3ModalProvider("");
    setAccount("");
  }

  return (
    <div>
      <div>{/* <ConnectWallet /> */}</div>
      <button onClick={() => setIsModalOpen(true)}>
        {web3ModalProvider ? "Connected" : "Connect Wallet"}
      </button>
      {/* {web3ModalProvider && <p>Wallet Address: {account}</p>} */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        {web3ModalProvider ? (
          <>
            <button onClick={disconnectWallet}>Disconnect</button>
            <button onClick={() => connectWallet()}>switch Wallet</button>
          </>
        ) : (
          <>
            <p>Connect to Any Wallet</p>
            <button onClick={() => connectWallet()}>Connect</button>
          </>
        )}
      </Modal>
    </div>
  );
};
export default ConnectWallets;
