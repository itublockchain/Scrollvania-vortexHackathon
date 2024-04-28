"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWatchContractEvent } from "wagmi";
import { scrollSepolia } from "wagmi/chains";
import Image from "next/image";

const LobiPage = () => {
  const [lobbyCode, setLobbyCode] = useState("");

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
      <div className="min-h-screen bg-[url('/bgImage.png')] bg-center bg-cover flex items-center justify-center">
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

        <div className="bg-white opacity-80 w-96 h-96 rounded-3xl absolute right-44">
          
        </div>
      </div>
    </>
  );
};

export default LobiPage;
