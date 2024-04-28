import {
  ENTRYPOINT_ADDRESS_V07,
  UserOperation,
  bundlerActions,
  getSenderAddress,
  signUserOperationHashWithECDSA,
  getRequiredPrefund,
  createSmartAccountClient,
} from "permissionless";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import {
  Address,
  Hex,
  createClient,
  createWalletClient,
  createPublicClient,
  encodeFunctionData,
  decodeFunctionData,
  http,
  parseEther,
  getContract,
  custom,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { gnosisChiado } from "viem/chains";
  import {
    
    gameAccountFactoryABI,

  } from "../utils/constants";
import dynamic from "next/dynamic";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { readContract } from "@wagmi/core";

import { config } from "./config";

const endpointUrl =
  "https://api.pimlico.io/v2/534351/rpc?apikey=0d1005ee-02d9-4836-810d-27d08cceb39b";

const AF_ADDRESS = "0xccB5a2D19A67a1a5105F674465CAe2c5Ab1496Ac";

export const walletClient = createWalletClient({
  chain: gnosisChiado,
  transport: custom(window.ethereum),
});

export const publicClient = createPublicClient({
  transport: http(
    "https://rpc.ankr.com/scroll_sepolia_testnet/d17775fb78762b92aacf9f30af7ccaac0c4e758d5bb9f2ebc3faef3b9cbed604"
  ),
  chain: gnosisChiado,
});

export const bundlerClient = createClient({
  chain: gnosisChiado,
  transport: http(endpointUrl),
})
  .extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
  .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07));

export const factory = AF_ADDRESS;

// CALLDATAS
export const factoryData = encodeFunctionData({
  abi: gameAccountFactoryABI,
  functionName: "createAccount",
  args: ["0x633aDfb3430b96238c9FB7026195D1d5b0889EA6", "Emirhan CAVUSOGLU"],
});

// export const createTSD = encodeFunctionData({
//   abi: accountABI,
//   functionName: "createTSD",
//   args: ["bok", "bok açıklama", "uri falan filan"],
// });
// export const attestTSD = encodeFunctionData({
//   abi: accountABI,
//   functionName: "attestTSD",
// });

//   export const entryPointContract = getContract({
//     address: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
//     abi: entryPointABI,
//     client: publicClient,

//   });

// export const accountContract = getContract({
//   address: "0x95dcB08D52Fe1D79dd6F6D159C28798D7C4656E9",
//   abi: accountABI,
//   client: publicClient,
// });

export const factoryContract = getContract({
  address: AF_ADDRESS,
  abi: gameAccountFactoryABI,
  client: publicClient,
});

// HELPER FUNCTIONS
export const getFactoryData = async (address: any, alias: any) => {
  const factoryData = encodeFunctionData({
    abi: gameAccountFactoryABI,
    functionName: "createAccount",
    args: [address, alias],
  });
  return factoryData;
};

// export const getCreateTSD = async (proofName, proofDescription, ipfsUrl) => {
//   const createTSD = encodeFunctionData({
//     abi: accountABI,
//     functionName: "createTSD",
//     args: [proofName, proofDescription, ipfsUrl],
//   });
//   return createTSD;
// };

// export const getAccountContract = async (address: any) => {
//   const accountContract = getContract({
//     address: address,
//     abi: accountABI,
//     client: publicClient,
//   });
//   return accountContract;
// };

export const getTSDContract = async (address: any) => {
  const tsdContract = getContract({
    address: address,
    abi: tsdABI,
    client: publicClient,
  });
  return tsdContract;
};

export const getGasPrice = async () => {
  const gasPrice = await bundlerClient.getUserOperationGasPrice();
  return gasPrice;
};
export const calculateSenderAddress = async (factoryData) => {
  const senderAddress = await getSenderAddress(publicClient, {
    factory,
    factoryData: factoryData,
    entryPoint: ENTRYPOINT_ADDRESS_V07,
  });
  return senderAddress;
};





// const fundAccount = async () => {
//     // const fund = await entryPointContract.write.depositTo([accountAddress],parseEther("0.01"));
//     // console.log(fund);
//     const factoryData = await getFactoryData(
//       primaryWallet?.address,
//       user?.alias
//     );
//     const { request } = await publicClient.simulateContract({
//       account: primaryWallet?.address,
//       address: ENTRYPOINT_ADDRESS_V07,
//       abi: entryPointABI,
//       functionName: 'depositTo',
//       args: [await calculateSenderAddress(factoryData)],
//       value: parseEther("0.2"),
//     })
//     const fund =await walletClient.writeContract(request)
//     console.log(fund)
//   }
