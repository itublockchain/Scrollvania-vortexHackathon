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
  }, []);

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

  const getAccountJoined = async () => {
    const result = await readContract(config, {
      abi: lobbyABI,
      //@ts-ignore
      address: id,
      functionName: "accountToOwner",
      chainId: scrollSepolia.id,
      args: [gameAccount],
    });
    console.log(result);
  };

  const joinLobby = async (nickName) => {
    setNickname(nickName);
    let nonce = await (entryPointContract as any).read.getNonce([
      gameAccount,
      0,
    ]);
    let gasPrice = await getGasPrice();

    const joinLobbyData = await getJoinLobbyData(lobbyCode, nickName);

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

  return (
    <>
      <div className="min-h-screen bg-[url('/bgImage.png')] bg-center bg-cover flex items-center justify-center">
        <form
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
            <input type="text" name="nickname" required />
          </label>
          <button type="submit">Join Lobby</button>
        </form>
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
