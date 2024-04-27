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
      <div className="flex flex-row space-x-10 justify-center">
        <div className="bg-violet-900 w-72 h-44 rounded-2xl flex flex-col justify-center items-center space-y-2 mt-6">
          <p className="text-xl">Lobi Kodu: {lobbyCode}</p>

          <button className="h-12 w-28 bg-rose-900 rounded-full">
            Oyunu Başlat
          </button>
        </div>

        <div className="bg-violet-900 h-[800px] w-[800px] rounded-3xl mt-6"></div>
      </div>
    </>
  );
};

export default LobiPage;
