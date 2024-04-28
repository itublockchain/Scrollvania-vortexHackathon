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
  entryPointABI,
  gameAccountFactoryABI,
  gameAccountABI,
} from "../utils/constants";
import dynamic from "next/dynamic";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { readContract } from "@wagmi/core";

import { config } from "./config";

const endpointUrl =
  "https://api.pimlico.io/v2/534351/rpc?apikey=0d1005ee-02d9-4836-810d-27d08cceb39b";

const AF_ADDRESS = "0xaB0BFe7fC32bb98fD6FdeC3755ec3E78A2980121";

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
  args: ["0x633aDfb3430b96238c9FB7026195D1d5b0889EA6", "Emirhan"],
});

export const incrementFuncData = encodeFunctionData({
  abi: gameAccountABI,
  functionName: "increment",
});

export const entryPointContract = getContract({
  address: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
  abi: entryPointABI,
  client: publicClient,
});

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
