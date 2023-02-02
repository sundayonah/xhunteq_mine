import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import routerAbi from "../Contract/abi.json";
import bscAbi from "../Contract/bscAbi.json";
import { FerrisWheelSpinner } from "react-spinner-overlay";
// import Web3Modal from "web3modal";
// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
export const TransactionContext = createContext({});
export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [congrat, setCongrat] = useState(false);
  const [maximum, setMaximum] = useState();
  const [minimum, setMinimum] = useState();
  const [roi, setRoi] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [totalInvest, setTotalInvest] = useState();
  const [depositAddress, setDepositAddress] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [minDeposit, setMinDeposit] = useState("");
  const [maxDeposit, setMaxDeposit] = useState("");
  //   EXTERNAL............................
  const routerAddress = "0x7872D3C3Ebc9152daEeC572311E9A51724ff70A5";
  const bscAddress = "0x10249E900B919FDEe9e2ED38b4cd83C4df857254";
  const ownerAddress = "0x97C982a4033d5fceD06Eedbee1Be10778E811D85";

  const connectWallet = async () => {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined")
      try {
        if (!window.ethereum) return alert("Please install MetaMask");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        console.log(accounts);
        setIsLoading(false);
      } catch (error) {}
  };

  //investment
  useEffect(() => {
    const Invest = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const investArray = await profile.investments(currentAccount);
        // Check if the array has a valid value, otherwise set to 0
        let invest = ethers.constants.Zero;
        if (investArray.length >= 1) {
          invest = investArray[0];
        }
        // Format the invest value as a string
        const maxInvest = ethers.utils.formatUnits(invest, "wei");
        const Tinvest = maxInvest.toLocaleString();
        setTotalInvest(Tinvest);
        console.log(Tinvest, "total investments");
      } catch (error) {
        console.error(error);
      }
    };

    Invest();
  }, [currentAccount]);

  // function balanceOf(address account) external view returns (uint256);

  //WALLET BALLANCE
  useEffect(() => {
    const walletBalance = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(bscAddress, bscAbi, signer);
        const bal = await profile.balanceOf(currentAccount);
        const balance = ethers.utils.formatUnits(bal, "ether");
        const formattedBal = balance.toLocaleString();
        setWalletBalance(formattedBal);
        console.log(formattedBal, "balanceOf acc in BUSD");
      } catch (error) {
        console.error(error);
      }
    };

    walletBalance();
  }, [currentAccount]);

  //_MAXIMUM
  useEffect(() => {
    const Maximum = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const max = await profile._max();
        const maxNumber = ethers.utils.formatUnits(max, "ether");
        const formattedNumber = maxNumber.toLocaleString();
        setMaximum(formattedNumber);
        // console.log(formattedNumber, "minimum");
      } catch (error) {
        console.error(error);
      }
    };

    Maximum();
  }, []);

  //_MINIMUM
  useEffect(() => {
    const Minimum = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const min = await profile._min();
        const maxNumber = ethers.utils.formatUnits(min, "ether");
        const formattedNumber = maxNumber.toLocaleString();

        setMinimum(formattedNumber);
        // console.log(formattedNumber, "maximum");
      } catch (error) {
        console.error(error);
      }
    };

    Minimum();
  }, []);

  //_ROI
  useEffect(() => {
    const ROI = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const cent = await profile._roi();
        const format = ethers.utils.formatUnits(cent, "wei");
        // const percent = ((format / 1e18) * 100).toFixed() + "%";
        setRoi(format + "%");
        // console.log(format.toLocaleString() + "%", "_roi percent");
      } catch (error) {
        console.error(error);
      }
    };

    ROI();
  }, []);

  //Deposit f(x)
  const handleDeposit = async () => {
    try {
      const minDeposit = ethers.utils.parseUnits("50", "ether");
      const maxDeposit = ethers.utils.parseUnits("20000", "ether");
      const depositAMt = ethers.utils.parseUnits(depositAmount, "ether");
      console.log(
        minDeposit.toString(),
        "depositAmount",
        depositAmount.toString()
      );
      // || depositAmount <= maxDeposit;
      if (depositAMt < minDeposit || depositAMt > maxDeposit) {
        console.error("Amount must be between the minimum and maximum values");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(routerAddress, routerAbi, signer);

      await profile.deposit(depositAddress, depositAmount, {
        gasLimit: 51000,
        gasPrice: ethers.utils.parseUnits("10.0", "gwei"),
      });

      console.log("Deposit successful!");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDeposit = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const profile = new ethers.Contract(routerAddress, routerAbi, signer);
  //     const ref = currentAccount; // replace with the actual address of the referer
  //     const amount = "5000000000000000000"; // replace with the actual amount in wei
  //     await profile.deposit(ref, amount, {
  //       gasLimit: 61000,
  //       gasPrice: ethers.utils.parseUnits("10.0", "gwei"),
  //     });
  //     console.log(profile, "Deposit successful!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //Approve f(x)
  const Approved = async () => {
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(bscAddress, bscAbi, signer);
      const value = ethers.utils.parseUnits("0.02");
      const tx = await profile.approve(currentAccount, value, {
        gasLimit: 61000,
      });
      if (tx.status === 1) {
        console.log(tx, "congratulation");
      }
      setCongrat(true);
    } catch (error) {
      console.error(error);
    } finally {
    }
    setIsLoading(false);
  };
  //_ROI
  useEffect(() => {
    const dailyroi = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const cent = await profile.DailyRoi();
        const roi = ethers.utils.formatUnits(cent, "wei");
        // const percent = ((roi / 1e18) * 100).toFixed() + "%";
        setRoi(roi + "%");
        console.log(roi.toLocaleString() + "%", "_roi percent");
      } catch (error) {
        console.error(error);
      }
    };

    dailyroi();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        Approved,
        routerAddress,
        isLoading,
        congrat,
        minimum,
        maximum,
        roi,
        walletBalance,
        handleDeposit,
        setDepositAddress,
        setDepositAmount,
        depositAddress,
        depositAmount,
        minDeposit, // max,
        maxDeposit,
        totalInvest,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
