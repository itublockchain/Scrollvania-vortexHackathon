"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWatchContractEvent } from "wagmi";
import { scrollSepolia } from "wagmi/chains";

const LobiPage = () => {
  const [lobbyCode, setLobbyCode] = useState("");

  async function StartGame() {
    useWatchContractEvent({
      address: "0x",
      eventName: "",
      chainId: scrollSepolia.id,
      abi: [],
      onLogs(logs) {
        console.log("New logs!", logs);
      },
    });
  }

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split("/");
    const code = parts[parts.length - 1];
    setLobbyCode(code);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[url('/bgImage.png')] bg-center bg-cover ">
        <div className="w-16 h-16 rounded-full bg-white">
          
        </div>
      </div>
    </>
  );
};

export default LobiPage;
