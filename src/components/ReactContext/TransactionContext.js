import React from "react";
import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import routerAbi from "../Contract/abi.json";
import bscAbi from "../Contract/bscAbi.json";
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
  const [dailyRoiAmount, setDailyRoiAmount] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [totalInvest, setTotalInvest] = useState();
  const [depositAddress, setDepositAddress] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [minDeposit, setMinDeposit] = useState("");
  const [maxDeposit, setMaxDeposit] = useState("");
  const [totalDeposit, setTotalDeposit] = useState("");
  const [userReward, setUserReward] = useState("");
  const [profitAmount, setProfitAmount] = useState("");
  const [totalReward, setTotalReward] = useState("");
  const [withDrawFee, setWithDrawFee] = useState("");
  const [refferal, setRefferal] = useState("");
  const [error, setError] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [accountBal, setAccountBal] = useState("");
  const [address, setAddress] = useState("");
  const [rewardPool, setRewardPool] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [withdrawal, setWithdrawal] = useState("");
  const [claimTime, setClaimTime] = useState(0);
  const [time, setTime] = useState(0);
  const [deadlineTimestamp, setDeadlineTimestamp] = useState("");
  const [nextWithdrawal, setNextWithdrawal] = useState("");

  // /""INTERNAL............................
  const routerAddress = "0x7872D3C3Ebc9152daEeC572311E9A51724ff70A5";
  const bscAddress = "0x10249E900B919FDEe9e2ED38b4cd83C4df857254";
  const ownerAddress = "0x97C982a4033d5fceD06Eedbee1Be10778E811D85";

  const connectWallet = async () => {
    // setIsLoading(true);
    if (typeof window.ethereum !== "undefined")
      try {
        // if (!window.ethereum) return alert("Please install MetaMask");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(
          accounts[0]
          // `${accounts[0].substr(0, 4)}...${accounts[0].substr(-4)}`
        );
        setUserAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const curbal = ethers.utils.formatEther(balance, "ether");
        const etherbal = parseFloat(curbal.toString());
        const roundedbal = etherbal.toFixed(4);

        setAccountBal(roundedbal);
        setAddress(`${accounts[0].substr(0, 4)}...${accounts[0].substr(-4)}`);
        console.log(accountBal, "account bal");
        console.log(
          "address:",
          `${accounts[0].substr(0, 4)}...${accounts[0].substr(-4)}`,
          "bal:",
          roundedbal
        );
        console.log(accountBal, roundedbal, balance, "account bal");

        setIsLoading(false);
      } catch (error) {}
  };
  //DAILYREWARD
  // useEffect(() => {
  //   const claimDaily = async () => {
  //     try {
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const profile = new ethers.Contract(routerAddress, routerAbi, signer);
  //       const Daily = await profile.claimDailyRewards();
  //       const dailyReward = ethers.utils.formatUnits(Daily, "ether");
  //       const formatteddailyReward = dailyReward.toLocaleString();

  //       setTotalReward(formatteddailyReward);
  //       console.log(formatteddailyReward, "dailyReward,,,.,.,");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   claimDaily();
  // }, [currentAccount]);

  //TOTALREWARD
  useEffect(() => {
    const TOTALReward = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const Treward = await profile.totalRewards(currentAccount);
        const TmaxReward = ethers.utils.formatUnits(Treward, "ether");
        const formattedTReward = TmaxReward.toLocaleString();
        setTotalReward(formattedTReward);
        // console.log(formattedTReward, "totalReward,,,.,.,");
      } catch (error) {
        console.error(error);
      }
    };

    TOTALReward();
  }, [currentAccount]);

  //UserReward
  useEffect(() => {
    const UserReward = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const reward = await profile.userReward(currentAccount);
        const maxReward = ethers.utils.formatEther(reward, "ether");
        const formattedReward = maxReward.toLocaleString();
        const etherUserRewad = parseFloat(formattedReward.toString());
        const roundedUserReward = etherUserRewad.toFixed(2);
        setUserReward(roundedUserReward);
        console.log(roundedUserReward, "userReward");
      } catch (error) {
        console.error(error);
      }
    };

    UserReward();
  }, [currentAccount]);

  // investment get back to you later
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
      console.log(Tinvest, invest, profile, "total investments");
    } catch (error) {
      console.error(error);
    }
    useEffect(() => {
      Invest();
    }, []);
  };

  // function balanceOf(address account) external view returns (uint256);

  //WALLET BALLANCE
  useEffect(() => {
    const walletBalance = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(bscAddress, bscAbi, signer);
        const bal = await profile.balanceOf(currentAccount);
        const balance = ethers.utils.formatEther(bal, "ether");
        const etherAmountAsNumber = parseFloat(balance.toString());
        const roundedEtherAmount = etherAmountAsNumber.toFixed();
        setWalletBalance(roundedEtherAmount);
        console.log(roundedEtherAmount, "format acc in BUSD");
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

  //WITHDRAW FEE
  useEffect(() => {
    const WithdrawFee = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const _amount = depositAmount;
        const fee = await profile.withdrawFee(_amount);
        const wFee = ethers.utils.formatUnits(fee, "wei");
        setWithDrawFee(wFee + "%");
        console.log(wFee.toLocaleString() + "%", "WithdrawFee.....");
      } catch (error) {
        console.error(error);
      }
    };
    WithdrawFee();
  }, []);

  //Deposit f(x)
  const HandleDeposit = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(routerAddress, routerAbi, signer);
      const minDeposit = await profile._min();
      const maxDeposit = await profile._max();
      const minDepositInEther = ethers.utils.formatEther(minDeposit);
      const maxDepositInEther = ethers.utils.formatEther(maxDeposit);
      const depositAMt = ethers.utils.parseUnits(
        depositAmount.toString(),
        "ether"
      );
      if (depositAMt.lt(minDeposit) || depositAMt.gt(maxDeposit)) {
        console.error(
          `Amount must be between $${minDepositInEther} and $${maxDepositInEther}`
        );
        setError(true);
        return;
      }

      // const isApproved = await profile.checkAlready();
      // if (!isApproved) {
      //   console.error("Address must be approved before making a deposit");
      //   return;
      // }

      await profile.deposit(currentAccount, depositAMt, {
        gasLimit: 500000,
        gasPrice: ethers.utils.parseUnits("10.0", "gwei"),
      });

      console.log("Deposit successful!");
    } catch (error) {
      console.error(error);
    }
  };

  //CHECKALREADY
  const CheckAlready = () => {
    useEffect(() => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(routerAddress, routerAbi, signer);
      profile.methods
        .checkAlready()
        .call()
        .then((result) => {
          setIsApproved(result);
          if (!result) {
            Invest();
            console.log(isApproved, "i have invested");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      CheckAlready();
    }, []);
  };
  //Approve f(x)
  const Approved = async () => {
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(bscAddress, bscAbi, signer);
      const value = ethers.utils.parseUnits("5000", "ether");
      const tx = await profile.approve(routerAddress, value, {
        gasLimit: 61000,
      });
      console.log(tx, "TRANSACTION");
      // if (tx.status === 1) {
      //   console.log(tx, "congratulation");
      // }
      setIsApproved(true);
      setCongrat(true);
    } catch (error) {
      console.error(error);
    } finally {
    }
    setIsLoading(false);
  };
  //TOTAL DEPOSITED
  useEffect(() => {
    const TotalDeposit = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const Tdeposit = await profile.totalDeposited();
        const TNumber = ethers.utils.formatEther(Tdeposit, "ether");
        const formattedTNumber = TNumber.toLocaleString();
        setTotalDeposit(formattedTNumber);
        // console.log(formattedTNumber, "total deposited");
      } catch (error) {
        console.error(error);
      }
    };

    TotalDeposit();
  }, []);
  // 3x Profit Amoount
  useEffect(() => {
    const ProfitAmoount = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const ProfitAMT = await profile.totalDeposited();
        const profit = ethers.utils.formatEther(ProfitAMT, "ether");
        const profits = (profit * 3).toLocaleString();
        setProfitAmount(profits);
        // console.log(profits, "3X total deposited");
      } catch (error) {
        console.error(error);
      }
    };

    ProfitAmoount();
  }, []);

  //REFFERAL
  const Refferal = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(routerAddress, routerAbi, signer);
      const max = await profile.refferal();
      const maxNumber = ethers.utils.formatUnits(max, "ether");
      const formattedNumber = maxNumber.toLocaleString();
      setRefferal(formattedNumber);
      // console.log(formattedNumber, "minimum");
    } catch (error) {
      console.error(error);
    }
  };

  //WEEKLYWITHDRAW
  const WeeklyWithdraw = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(routerAddress, routerAbi, signer);
      const weekly = await profile.weeklyWithdraw();

      const deadline_weekly =
        (await profile.block.timestamp()) + 7 * 24 * 60 * 60;
      const start_20_percent_count =
        (await profile.block.timestamp()) + 5 * 7 * 24 * 60 * 60;

      const address = await window.ethereum.enable();
      const msgSender = address[0];

      console.log(msgSender, "weekly withdraw");
      profile
        .weeklyWithdraw(
          msgSender,
          await profile.block.timestamp(),
          deadline_weekly,
          start_20_percent_count
        )
        .then(function (result) {
          console.log(result);
        })
        .catch(function (error) {
          console.error(error);
        });

      const withdraw = ethers.utils.formatUnits(weekly, "ether");
      const weeklyaward = withdraw.toLocaleString();
      // setRefferal(weeklyaward);
      console.log(weeklyaward, "weekly withdraw");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    WeeklyWithdraw();
  }, []);
  //DailyRoi
  useEffect(() => {
    const Dailyroi = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const sent = await profile.DailyRoi(); //what value to be added currentAccount ? total invest
        const dailyroi = ethers.utils.formatUnits(sent, "ether");
        setDailyRoiAmount(dailyroi);
        console.log(dailyroi, "dailyroi percent");
      } catch (error) {
        console.error(error);
      }
    };
    Dailyroi();
  }, []);
  //POOL PROFIT
  useEffect(() => {
    const RewardPool = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const profile = new ethers.Contract(routerAddress, routerAbi, signer);
        const pool = await profile.maxRewardPool();
        const poolReward = ethers.utils.formatUnits(pool, "ether");
        setRewardPool(poolReward);
        console.log(poolReward, "poolReward percent");
      } catch (error) {
        console.error(error);
      }
    };

    RewardPool();
  }, []);

  // Function to convert time in seconds to minutes and hours
  const convertToTime = (times) => {
    const seconds = times.map((time) => time - Math.floor(Date.now() / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const ClaimDailyRewards = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(routerAddress, routerAbi, signer);

      // // Daily Roi Amount
      // const approvedWithdrawal = await profile.approvedWithdrawal(
      //   currentAccount
      // );
      // console.log(approvedWithdrawal, "approvedWithdrawal approvedWithdrawal");

      const claimTimeI = await profile.claimTime(currentAccount);
      // setClaimTime(claimTimeInSeconds);
      const time = convertToTime(claimTimeI);
      console.log(time, claimTimeI, "Claim Time in seconds");

      const tx = await profile.claimDailyRewards({
        gasLimit: 500000,
        gasPrice: ethers.utils.parseUnits("10.0", "gwei"),
      });

      // const nextClaimTime = new Date(time * 1000).toLocaleString();

      console.log(time, "nextClaimTime nextClaimTime nextClaimTime");

      // const wait = await tx.wait();
      // const rewards = await profile.totalRewards(currentAccount);
      // console.log(ethers.utils.formatUnits(rewards, "ether"));
      // setWithdrawal(ethers.utils.formatUnits(rewards, "ether"));

      // Set the time in the UI
      setTime(time);
    } catch (error) {
      console.error(error);
    }
  };
  // const formatTime = (seconds) => {
  //   const h = Math.floor(seconds / 3600);
  //   const m = Math.floor((seconds % 3600) / 60);
  //   const s = seconds % 60;
  //   console.log(h, "hhhhhhh");
  //   return `${h}h ${m}m ${s}s`;
  // };

  //claim Daily Rewards
  // const ClaimDailyRewards = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const profile = new ethers.Contract(routerAddress, routerAbi, signer);
  //     const max = await profile.claimDailyRewards({
  //       gasLimit: 500000,
  //       gasPrice: ethers.utils.parseUnits("10.0", "gwei"),
  //     });
  //     const claimDailyRewards = ethers.utils.formatUnits(max, "ether");
  //     const DailyRewards = claimDailyRewards.toLocaleString();
  //     setDailyRewards(DailyRewards);
  //     console.log(DailyRewards, "claim daily claims");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //WITHDRAWAL
  // const ClaimDailyRewards = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const profile = new ethers.Contract(routerAddress, routerAbi, signer);

  //     const tx = await profile.claimDailyRewards({
  //       gasLimit: 500000,
  //       gasPrice: ethers.utils.parseUnits("10.0", "gwei"),
  //     });
  //     const claimTimeInSeconds = await profile.claimTime(currentAccount);
  //     setClaimTime(claimTimeInSeconds);
  //     console.log(claimTimeInSeconds, "CLAI LM ADJNC");

  //     // const time1 = claimTimeInSeconds[0];
  //     // const time2 = claimTimeInSeconds[1];
  //     // const time3 = claimTimeInSeconds[2];

  //     // //deadline
  //     // const userTime2 = ethers.utils.formatEther(time2, "ether");
  //     // const Float2 = parseFloat(userTime2);
  //     // const round2 = Float2.toFixed();
  //     // console.log(round2, "2 khfgfjgfghcnfdurdfig");

  //     // //starttime
  //     // const userTime3 = ethers.utils.formatEther(time3, "ether");
  //     // const float3 = parseFloat(userTime3);
  //     // const round3 = float3.toFixed();
  //     // console.log(round3, "3 khfgfjgfghcnfdurdfig");

  //     // const userVestingData0InEther = ethers.utils.formatEther(
  //     //   userVestingData0,
  //     //   "ether"
  //     // );
  //     // const time4 = claimTimeInSeconds.deadline;
  //     // console.log(time1, "1 khfgfjgfghcnfdurdfig");
  //     // console.log(time3, "3 khfgfjgfghcnfdurdfig");
  //     // console.log(time4, "44444 khfgfjgfghcnfdurdfig");

  //     const wait = await tx.wait();
  //     const rewards = await profile.totalRewards(currentAccount);
  //     console.log(ethers.utils.formatUnits(rewards, "ether"));
  //     // setWithdrawal(ethers.utils.formatUnits(rewards, "ether"));

  //     // Convert claim time to seconds, minutes and hours
  //     const time = convertToTime(claimTimeInSeconds);
  //     console.log(time);

  //     // Set the time in the UI
  //     setTime(time);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const convertToTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   const hours = Math.floor(minutes / 60);
  //   const remainingMinutes = minutes % 60;

  //   console.log(minutes, "remainingSeconds remainingSeconds");
  //   return {
  //     seconds: remainingSeconds,
  //     minutes: remainingMinutes,
  //     hours: hours,
  //   };
  // };

  //WITHDRAWAL
  const Withdrawal = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const profile = new ethers.Contract(routerAddress, routerAbi, signer);

      const deadlineTimestamp =
        Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

      const deadlineDate = new Date(deadlineTimestamp * 1000);

      const formattedDeadline = deadlineDate.toLocaleString();
      setDeadlineTimestamp(formattedDeadline);

      const nextWithdrawal = await profile.weekly(currentAccount);
      const nextWithdrawalTimestamp = nextWithdrawal.deadline.toNumber();

      const nextWithdrawalDate = new Date(nextWithdrawalTimestamp * 1000);
      const formattedNextWithdrawal = nextWithdrawalDate.toLocaleString();
      setNextWithdrawal(formattedNextWithdrawal);

      // const checkOut = formattedNextWithdrawal <= formattedDeadline;

      //display profit pool
      const next = await profile.totalWithdraw(currentAccount);
      const next1 = (next[1] / 1e18).toFixed(1);
      console.log(next1, "next1 next1");

      // console.log(next1, "next1 next1");

      // console.log(next, " nextWithdrawal nextWithdrawal");
      // console.log(checkOut, " checkOut checkOut");

      console.log(
        formattedNextWithdrawal,
        " formattedNextWithdrawal from smart contract"
      );
      console.log(formattedDeadline, "formattedDeadline from normal date ");

      const max = await profile.withdrawal({
        gasLimit: 500000,
        gasPrice: ethers.utils.parseUnits("10", "gwei"),
      });
      const withdrawal = ethers.utils.formatUnits(max, "ether");
      const withdraw = withdrawal.toLocaleString();
      setWithdrawal(withdraw);
      console.log(withdraw, max);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Withdrawal();
  }, []);

  // const getDeadlineTimestamp = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(routerAddress, routerAbi, signer);
  //     const deadlineTimestamp = await contract.getDeadlineTimestamp();
  //     setDeadlineTimestamp(deadlineTimestamp);
  //   } catch (error) {
  //     console.error(error);
  //     console.log(deadlineTimestamp, "cLJDLDWlHLDHCLHdcpiWDFQ w");
  //   }
  // };

  // const enable = async () => {
  //   try {
  //     const address = await window.ethereum.enable();
  //     console.log(address, "enavle");
  //     return address[0];
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  //   // const msg.sender = await enable();
  // };
  // useEffect(() => {
  //   enable();
  // }, []);

  return (
    <TransactionContext.Provider
      value={{
        // formatTime,
        nextWithdrawal,
        deadlineTimestamp,
        Withdrawal,
        convertToTime,
        time,
        claimTime,
        ClaimDailyRewards,
        userAddress,
        Refferal,
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
        HandleDeposit,
        setDepositAddress,
        setDepositAmount,
        depositAddress,
        depositAmount,
        minDeposit, // max,
        maxDeposit,
        totalInvest,
        CheckAlready,
        Invest,
        dailyRoiAmount,
        totalDeposit,
        userReward,
        profitAmount,
        totalReward,
        withDrawFee,
        error,
        isApproved,
        accountBal,
        address,
        rewardPool,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
