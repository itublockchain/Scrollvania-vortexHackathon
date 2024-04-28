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

export const gameAccountFactoryABI=[
  {
    "type": "function",
    "name": "accounts",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createAccount",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" },
      { "name": "userName", "type": "string", "internalType": "string" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "hasAccount",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ownerToAccount",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "AccountCreated",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "owner",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  }
]