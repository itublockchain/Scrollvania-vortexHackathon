"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import { config } from "../utils/config";
import {
  bundlerClient,
  getGasPrice,
  entryPointContract,
  incrementFuncData,
} from "../utils/helpers";

import {
  AF_ADDRESS,
  entryPointABI,
  eventContractABI,
  eventContractAddress,
  gameAccountABI,
  gameAccountFactoryABI,
  lobbyFactoryABI,
  lobbyFactoryAddress,
} from "../utils/constants";
import { readContract, writeContract } from "wagmi/actions";
import { scrollSepolia } from "wagmi/chains";
import { calculateSenderAddress, factoryData } from "@/utils/helpers";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { parseEther, Hex } from "viem";
import { get } from "http";

export default function Home() {
  const [lobbyCode, setLobbyCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [lobbies, setLobbies] = useState(null);
  const [gameAccount,setGameAccount] = useState(null);
  const router = useRouter();
  const {address} = useAccount();

  useEffect(() => {
    const getLobbies = async () => {
      const result = (await readContract(config, {
        abi: lobbyFactoryABI,
        address: lobbyFactoryAddress,
        functionName: "getDeployedLobbies",
        chainId: scrollSepolia.id,
      })) as any;

      // Filter out the objects where gameFinished is false
      const filteredLobbies = result.filter(
        (lobby) => lobby.gameFinished === false
      );

      // Set the filtered lobbies state
      setLobbies(filteredLobbies);
    };

    getLobbies();
    getAccount();

  }, []);

  const consoleLobbies = async () => {
    console.log(lobbies);
  };

  const handleCreateLobby = () => {
    const generatedCode = generateRandomCode();
    setLobbyCode(generatedCode);
    setShowPopup(true);
  };

  const consoleAccount = async () => {
    console.log(gameAccount);
  }

  const getAccount = async () => {
    const result = await readContract(config, {
      abi: gameAccountFactoryABI,
      address: AF_ADDRESS,
      functionName: "ownerToAccount",
      chainId: scrollSepolia.id,
      args: [address],
    });
    setGameAccount(result);
  }

  useWatchContractEvent({
    address: eventContractAddress,
    abi: eventContractABI,
    eventName: "ev",
    chainId: scrollSepolia.id,

    onLogs(logs) {
      console.log("New logs!", logs);
    },
  });



  const fundAccount = async () => {
    const result = await writeContract(config, {
      abi: gameAccountABI,
      address: gameAccount,
      functionName: "fundMe",
      chainId: scrollSepolia.id,
      value: parseEther("0.01"),
    });
    console.log(result);
  }

  const fundEntryPoint = async () => {
    const result = await writeContract(config, {
      abi: entryPointABI,
      address: ENTRYPOINT_ADDRESS_V07,
      functionName: "depositTo",
      chainId: scrollSepolia.id,
      args: [gameAccount],
      value: parseEther("0.01"),
    });
  };

  // const consoleResult = async () => {
  //   const result = await readContract(config, {
  //     abi: eventContractABI,
  //     address: eventContractAddress,
  //     functionName: "count",
  //     chainId: scrollSepolia.id,
  //   });
  //   console.log(result);
  // };
  const consoleCount = async () => {
    const result = await readContract(config, {
      abi: gameAccountABI,
      address: gameAccount,
      functionName: "count",
      chainId: scrollSepolia.id,
    });
    console.log(result);
  };

  const createLobby = async () => {
    const result = await writeContract(config, {
      abi: lobbyFactoryABI,
      address: lobbyFactoryAddress,
      functionName: "createLobby",
      chainId: scrollSepolia.id,
      
    });
    console.log(result);
  }

  const incrementOP = async () => {
    let nonce = await (entryPointContract as any).read.getNonce([
      gameAccount,
      0,
    ]);
    let gasPrice = await getGasPrice();

    // const senderAddress = await calculateSenderAddress(factoryData);

    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: gameAccount,
        nonce: BigInt(nonce),
        callData: incrementFuncData as Hex,
        maxFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        maxPriorityFeePerGas: BigInt(gasPrice.fast.maxPriorityFeePerGas),
        paymasterVerificationGasLimit: BigInt(1000000),
        signature: "0x" as Hex,
        callGasLimit: BigInt(1_000_000),
        verificationGasLimit: BigInt(1_000_000),
        preVerificationGas: BigInt(1_000_000),
      },
    });

    console.log("Received User Operation hash:" + userOperationHash);

    console.log("Querying for receipts...");
    const receipt = await bundlerClient.waitForUserOperationReceipt({
      hash: userOperationHash,
    });

    const txHash = receipt.receipt.transactionHash;

    console.log(`UserOperation included: ${txHash}`);
  };

  const generateRandomCode = () => {
    const characters = "0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };
  const consoleSenderAddress = async () => {
    const senderAddress = await calculateSenderAddress(factoryData);
    console.log(senderAddress);
  };

  const handleJoinLobby = () => {
    const inputCode = prompt("Lobi davet kodunu girin:");
    if (inputCode === lobbyCode) {
      window.location.href = `/lobby/${lobbyCode}`;
    } else {
      alert("Hatalı lobi davet kodu!");
    }
  };

  const createAccount = async () => {
    const result = await writeContract(config, {
      abi: gameAccountFactoryABI,
      address: AF_ADDRESS,
      functionName: "createAccount",
      chainId: scrollSepolia.id,
      args: [address, "Emirhan"],
    });
    console.log(result);
  };

  return (
    <>
      <div className="min-h-screen bg-[url('/bgImage.png')] bg-center bg-cover ">
        <h3 className="text-8xl flex justify-center pt-14 text-white opacity-85 font-extrabold">
          Welcome to Scrollvania
        </h3>
        <div className="flex flex-row justify-evenly items-center ">
          <div className="w-[700px] h-[500px] bg-white rounded-3xl opacity-80 flex flex-col">
            {lobbies &&
              lobbies.map((lobby, index) => {
                return (
                  <Link
                    key={index}
                    href={`/lobby/${lobby.lobbyAddress}`}
                  >
                    <div
                      key={index}
                      className="flex flex-row justify-between p-2"
                    >
                      <p>Join Lobby </p>
                      <p>
                        {lobby.gameFinished
                          ? "Oyun Bitti"
                          : "Oyun Devam Ediyor"}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
          <Image
            src={"/vampir.png"}
            alt="Vampir"
            width={400}
            height={1000}
            className="flex flex-col pt-[171px]"
          />

          <div className="flex flex-col justify-center items-center space-y-16">
          <ConnectButton />
            <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => setShowPopup(true)}
            >
              How to Play
            </button>
            {/* <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => consoleResult()}
            >
              Connect Wallet
            </button> */}
            {/* <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => consoleSenderAddress()}
            >
              Sender Address
            </button> */}
            <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => fundEntryPoint()}
            >
              FundMe
            </button>
            <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => fundAccount()}
            >
              FundAccount
            </button>
            <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => createAccount()}
            >
              CreateAccount
            </button>
            <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => createLobby()}
            >
              CreateLobby
            </button>

            {/* <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => consoleCount()}
            >
              Count
            </button> */}
            {/* <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => incrementOP()}
            >
              Increment
            </button> */}
            
            {/* <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => consoleAccount()}
            >
              Account
            </button> */}
           
            
          
            
          </div>
        </div>
        {/* <h1 className="flex justify-center font-bold text-2xl pt-44">
            Welcome to Scrollvania 🧛‍♂️
          </h1> */}

        {/* <ConnectButton /> */}

        {/* <div className="flex flex-row space-x-5">
            <button
              onClick={handleCreateLobby}
              className="bg-purple-900 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-2xl"
            >
              Lobi Oluştur
            </button> */}

        {/* <button
              onClick={handleJoinLobby}
              className="bg-purple-900 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-2xl"
            >
              Lobiye Katıl
            </button>
          </div> */}

        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white flex flex-col space-y-5 p-4 rounded-3xl">
              oyunun açıklaması 
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl mt-2"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
