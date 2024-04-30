"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useWatchContractEvent } from "wagmi";
import { scrollSepolia } from "wagmi/chains";
import Image from "next/image";
import {
  bundlerClient,
  entryPointContract,
  getGasPrice,
  getJoinLobbyData,
  getKillData,
  getPayoutData,
  getVoteData,
} from "@/utils/helpers";
import { readContract } from "wagmi/actions";
import { AF_ADDRESS, gameAccountFactoryABI, lobbyABI } from "@/utils/constants";
import { config } from "@/utils/config";
import { useParams } from "next/navigation";
import { get } from "http";
import { Hex } from "viem";

const LobiPage = () => {
  const [lobbyCode, setLobbyCode] = useState("");
  const [gameAccount, setGameAccount] = useState(null);
  const router = useRouter();
  const { address } = useAccount();
  const { id } = useParams();
  const [nickname, setNickname] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [joinedAccount, setJoinedAccount] = useState();
  const [playerCount, setPlayerCount] = useState(0);
  console.log(address);
  const images = [
    "/kedi.png",
    "/ghost.png",
    "/frank.png",
    "/vampirrr.png",
    "/witch.png",
    "/kedi.png",
    "/ghost.png",
    "/frank.png",
    "/vampirrr.png",
    "/witch.png",
  ];

  useEffect(() => {
    getAccount();
    getAccountJoined();
  }, []);
  const consoleJoinedAccount = async () => {
    console.log(joinedAccount);
  };
  const getAccount = async () => {
    const result = await readContract(config, {
      abi: gameAccountFactoryABI,
      address: AF_ADDRESS,
      functionName: "ownerToAccount",
      chainId: scrollSepolia.id,
      args: [address],
    });
    setGameAccount(result);
  };
  console.log(gameAccount);

  const getPlayerCount = async () => {
    const result = await readContract(config, {
      abi: lobbyABI,

      address: `${id}`,
      functionName: "playerCount",
      chainId: scrollSepolia.id,
    });
    setPlayerCount(result as any);
  };

  const getAccountJoined = async () => {

    await getPlayerCount();
    for (let i = 0; i < playerCount; i++) {
      const result = await readContract(config, {
        abi: lobbyABI,

        address: `${id}`,
        functionName: "players",
        chainId: scrollSepolia.id,
        args: [i],
      });
      if (result === gameAccount) {
        setJoinedAccount(result as any);
      }
    }
  };

  const joinLobby = async (nickName) => {
    setNickname(nickName);
    let nonce = await (entryPointContract as any).read.getNonce([
      gameAccount,
      0,
    ]);
    let gasPrice = await getGasPrice();

    const joinLobbyData = await getJoinLobbyData(id, nickName);

    // const senderAddress = await calculateSenderAddress(factoryData);

    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: gameAccount,
        nonce: BigInt(nonce),
        callData: joinLobbyData as Hex,
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
  const kill = async (nickName) => {
    setNickname(nickName);
    let nonce = await (entryPointContract as any).read.getNonce([
      gameAccount,
      0,
    ]);
    let gasPrice = await getGasPrice();

    const killData = await getKillData(id, nickName);

    // const senderAddress = await calculateSenderAddress(factoryData);

    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: gameAccount,
        nonce: BigInt(nonce),
        callData: killData as Hex,
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
  const vote = async (nickName) => {
    setNickname(nickName);
    let nonce = await (entryPointContract as any).read.getNonce([
      gameAccount,
      0,
    ]);
    let gasPrice = await getGasPrice();

    const voteData = await getVoteData(id, nickName);

    // const senderAddress = await calculateSenderAddress(factoryData);

    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: gameAccount,
        nonce: BigInt(nonce),
        callData: voteData as Hex,
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
  const payout = async (nickName) => {
    let nonce = await (entryPointContract as any).read.getNonce([
      gameAccount,
      0,
    ]);
    let gasPrice = await getGasPrice();

    const payoutData = await getPayoutData(id);

    // const senderAddress = await calculateSenderAddress(factoryData);

    const userOperationHash = await bundlerClient.sendUserOperation({
      userOperation: {
        sender: gameAccount,
        nonce: BigInt(nonce),
        callData: payoutData as Hex,
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

  return (
    <>
      <div className="min-h-screen bg-[url('/bgImage.png')] bg-center bg-cover flex items-center justify-center">
      {isPopupOpen && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-10 "></div>
            <form
              className="bg-white p-8 space-y-4 rounded-4xl flex flex-col items-center rounded-3xl justify-center opacity-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const nicknameInput = form.elements.namedItem(
                  "nickname"
                ) as HTMLInputElement;
                joinLobby(nicknameInput.value);
                setIsPopupOpen(false);
              }}
            >
              <label>
                Nickname:
                <input
                  className=" bg-slate-400 rounded-3xl border-black border-2 ml-4 "
                  type="text"
                  name="nickname"
                  required
                />
              </label>
              <button className="bg-slate-600 opacity-80 w-44 h-8 hover:bg-purple-600 text-black text-center items-center justify-center flex  py-2 px-4 rounded-3xl" type="submit">Join Lobby</button>
            </form>
          </>
        )}
        <button onClick={() => consoleJoinedAccount()}>BAAAAAs</button>
        <div className="relative w-full flex flex-col items-center">
          <div className="circle">
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-24 h-24 rounded-full bg-white item flex justify-center items-center ml-[550px]"
                >
                  <Image
                    src={images[index]}
                    alt={`Picture ${index + 1}`}
                    width={60}
                    height={60}
                  />
                </div>
              ))}
            {/* <div className="">
              <Image
                src={"/vampire.png"}
                alt="vampire"
                width={300}
                height={300}
              />
            </div> */}
          </div>
        </div>

        <style jsx>{`
          .circle {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            width: 100%;
            height: 300px;
          }
          .item {
            position: absolute;
            transform: rotate(calc(36deg * var(--i))) translate(350px)
              rotate(calc(-36deg * var(--i)));
          }
          .item:nth-child(1) {
            --i: 0;
          }
          .item:nth-child(2) {
            --i: 1;
          }
          .item:nth-child(3) {
            --i: 2;
          }
          .item:nth-child(4) {
            --i: 3;
          }
          .item:nth-child(5) {
            --i: 4;
          }
          .item:nth-child(6) {
            --i: 5;
          }
          .item:nth-child(7) {
            --i: 6;
          }
          .item:nth-child(8) {
            --i: 7;
          }
          .item:nth-child(9) {
            --i: 8;
          }
          .item:nth-child(10) {
            --i: 9;
          }
        `}</style>

        <div className="bg-white opacity-80 w-96 h-96 rounded-3xl absolute right-44"></div>
      </div>
    </>
  );
};

export default LobiPage;
