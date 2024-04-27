export const eventContractAddress = "0x5F49Cf21273563a628F31cd08C1D4Ada7722aB58";
export const eventContractABI =[
    {
      "type": "function",
      "name": "count",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "throwEv",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    { "type": "event", "name": "ev", "inputs": [], "anonymous": false }
  ]