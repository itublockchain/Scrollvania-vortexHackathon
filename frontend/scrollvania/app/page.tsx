"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadContract, useWatchContractEvent } from "wagmi";
import { config } from "../utils/config";
import { eventContractABI, eventContractAddress } from "../utils/constants";
import { readContract } from "wagmi/actions";
import { scrollSepolia } from "wagmi/chains";  

export default function Home() {
  const [lobbyCode, setLobbyCode] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleCreateLobby = () => {
    const generatedCode = generateRandomCode();
    setLobbyCode(generatedCode);
    setShowPopup(true);
  };

  useWatchContractEvent({
    address: eventContractAddress,
    abi: eventContractABI,
    eventName: "ev",
    chainId: scrollSepolia.id,
    
    onLogs(logs) {
      console.log("New logs!", logs);
    },
  });

  // const result = useReadContract({
  //   abi: eventContractABI,
  //   address: eventContractAddress,
  //   functionName: "count",
  //   chainId: config.chains[0].id,
  // }).then((result) => {console.log(result)});

  const consoleResult = async () => {
    const result = await readContract(config, {
      abi: eventContractABI,
      address: eventContractAddress,
      functionName: 'count',
      chainId: scrollSepolia.id,
      
    })
    console.log(result)
  };

  const generateRandomCode = () => {
    const characters = "0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleJoinLobby = () => {
    const inputCode = prompt("Lobi davet kodunu girin:");
    if (inputCode === lobbyCode) {
      window.location.href = `/lobby/${lobbyCode}`;
    } else {
      alert("Hatalı lobi davet kodu!");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[url('/bgImage.png')] bg-center bg-cover ">
        <h3 className="text-8xl flex justify-center pt-14 text-white opacity-85 font-extrabold">
          Welcome to Scrollvania
        </h3>
        <div className="flex flex-row justify-evenly items-center ">
          <div className="w-96 h-[500px] bg-white rounded-3xl opacity-80 flex flex-col"></div>
          <Image
            src={"/vampir.png"}
            alt="Vampir"
            width={400}
            height={1000}
            className="flex flex-col pt-[171px]"
          />

          <div className="flex flex-col justify-center items-center space-y-28">
            <button
              className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
              onClick={() => setShowPopup(true)}
            >
              How to Play
            </button>
            <button className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl"
            onClick={()=>consoleResult()}>
              Connect Wallet
            </button>
            <button className="bg-white opacity-80 w-96 h-16 hover:bg-purple-600 text-black font-bold text-3xl py-2 px-4 rounded-3xl">
              Join Lobby
            </button>
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
            <div className="bg-white p-4 rounded-lg">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl mt-2"
              >
                Kapat
              </button>
            </div>
          </div>
        )}

        {/* <div className="max-w-lg bg-indigo-900 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-8">
              How to Play: Scrollvania
            </h1>
            <p className="text-lg mb-4">
              Welcome to Scrollvania, a gripping game of strategy and deception
              set in a cursed village!
            </p>
            <h2 className="text-xl font-semibold mb-4">Objective:</h2>
            <p className="mb-4">
              In Scrollvania, players are divided into two factions: the
              Villagers and the Vampire. The Villagers&apos; goal is to identify
              and eliminate the Vampire before they&apos;re all turned into
              vampires themselves. The Vampire&apos;s objective is to convert
              all the Villagers or avoid being identified and eliminated.
            </p>
            <h2 className="text-xl font-semibold mb-4">Game Setup:</h2>
            <p className="mb-4">
              <strong>Joining the Game:</strong> Players join Scrollvania by
              depositing a certain amount of Ether (ETH) into the smart
              contract.
            </p>
            <p className="mb-4">
              <strong>Choosing Roles:</strong> At the beginning of each round,
              players are randomly assigned the role of either a Villager or the
              Vampire.
            </p>
            <p className="mb-4">
              <strong>Swap Phase:</strong> Before the game begins, there is a
              swap phase where players can engage in a swap transaction. The
              player who pays the least gas fee becomes the Vampire, while the
              player who pays the most becomes a Villager. This adds an element
              of chance and strategy to the game.
            </p>
            <h2 className="text-xl font-semibold mb-4">Gameplay:</h2>
            <p className="mb-4">
              <strong>Daytime:</strong> During the day, players deliberate and
              vote on who they believe is the Vampire. The player with the most
              votes is lynched and eliminated from the game. If the Vampire is
              successfully identified, the Villagers win the round. If not, the
              game continues.
            </p>
            <p className="mb-4">
              <strong>Nighttime:</strong> During the night, the Vampire selects
              one player to convert into a vampire. The converted player is
              eliminated from the game. The cycle of Daytime and Nighttime
              continues until either all the Villagers are turned into vampires
              (Vampire victory) or the Vampire is identified and eliminated
              (Villager victory).
            </p>
            <h2 className="text-xl font-semibold mb-4">Win Conditions:</h2>
            <p className="mb-4">
              <strong>Villager Victory:</strong> The Villagers win if they
              successfully identify and eliminate the Vampire.
            </p>
            <p className="mb-4">
              <strong>Vampire Victory:</strong> The Vampire wins if all the
              Villagers are turned into vampires.
            </p>
            <h2 className="text-xl font-semibold mb-4">Endgame:</h2>
            <p className="mb-4">
              The game ends when one of the win conditions is met. If the
              Villagers win, the total Ether deposited by all players is evenly
              distributed among the surviving Villagers. If the Vampire wins,
              the Vampire claims the entire pot of Ether.
            </p>
            <p className="text-gray-600">
              <strong>
                Good luck, and may the best strategist prevail in Scrollvania!
              </strong>
            </p>
          </div> */}
      </div>
    </>
  );
}
