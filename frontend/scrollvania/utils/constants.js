export const eventContractAddress ="0x5F49Cf21273563a628F31cd08C1D4Ada7722aB58";
export const lobbyFactoryAddress = "0x03ec1EfC1f3811939cb7405979F99C490Dd8b196";
export const AF_ADDRESS = "0x87c34AEA223245362F8B8ba9066ff1C4aFe63303";

export const eventContractABI = [
  {
    type: "function",
    name: "count",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "throwEv",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  { type: "event", name: "ev", inputs: [], anonymous: false },
];

export const gameAccountFactoryABI = [
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
];
export const entryPointABI = [
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "addStake",
    inputs: [
      {
        name: "unstakeDelaySec",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "delegateAndRevert",
    inputs: [
      { name: "target", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "depositTo",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "deposits",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      { name: "deposit", type: "uint256", internalType: "uint256" },
      { name: "staked", type: "bool", internalType: "bool" },
      { name: "stake", type: "uint112", internalType: "uint112" },
      {
        name: "unstakeDelaySec",
        type: "uint32",
        internalType: "uint32",
      },
      { name: "withdrawTime", type: "uint48", internalType: "uint48" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDepositInfo",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "info",
        type: "tuple",
        internalType: "struct IStakeManager.DepositInfo",
        components: [
          { name: "deposit", type: "uint256", internalType: "uint256" },
          { name: "staked", type: "bool", internalType: "bool" },
          { name: "stake", type: "uint112", internalType: "uint112" },
          {
            name: "unstakeDelaySec",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "withdrawTime",
            type: "uint48",
            internalType: "uint48",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNonce",
    inputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "key", type: "uint192", internalType: "uint192" },
    ],
    outputs: [{ name: "nonce", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSenderAddress",
    inputs: [{ name: "initCode", type: "bytes", internalType: "bytes" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getUserOpHash",
    inputs: [
      {
        name: "userOp",
        type: "tuple",
        internalType: "struct PackedUserOperation",
        components: [
          { name: "sender", type: "address", internalType: "address" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "initCode", type: "bytes", internalType: "bytes" },
          { name: "callData", type: "bytes", internalType: "bytes" },
          {
            name: "accountGasLimits",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "preVerificationGas",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "gasFees", type: "bytes32", internalType: "bytes32" },
          {
            name: "paymasterAndData",
            type: "bytes",
            internalType: "bytes",
          },
          { name: "signature", type: "bytes", internalType: "bytes" },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "handleAggregatedOps",
    inputs: [
      {
        name: "opsPerAggregator",
        type: "tuple[]",
        internalType: "struct IEntryPoint.UserOpsPerAggregator[]",
        components: [
          {
            name: "userOps",
            type: "tuple[]",
            internalType: "struct PackedUserOperation[]",
            components: [
              {
                name: "sender",
                type: "address",
                internalType: "address",
              },
              {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "initCode",
                type: "bytes",
                internalType: "bytes",
              },
              {
                name: "callData",
                type: "bytes",
                internalType: "bytes",
              },
              {
                name: "accountGasLimits",
                type: "bytes32",
                internalType: "bytes32",
              },
              {
                name: "preVerificationGas",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "gasFees",
                type: "bytes32",
                internalType: "bytes32",
              },
              {
                name: "paymasterAndData",
                type: "bytes",
                internalType: "bytes",
              },
              {
                name: "signature",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "aggregator",
            type: "address",
            internalType: "contract IAggregator",
          },
          { name: "signature", type: "bytes", internalType: "bytes" },
        ],
      },
      {
        name: "beneficiary",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "handleOps",
    inputs: [
      {
        name: "ops",
        type: "tuple[]",
        internalType: "struct PackedUserOperation[]",
        components: [
          { name: "sender", type: "address", internalType: "address" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "initCode", type: "bytes", internalType: "bytes" },
          { name: "callData", type: "bytes", internalType: "bytes" },
          {
            name: "accountGasLimits",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "preVerificationGas",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "gasFees", type: "bytes32", internalType: "bytes32" },
          {
            name: "paymasterAndData",
            type: "bytes",
            internalType: "bytes",
          },
          { name: "signature", type: "bytes", internalType: "bytes" },
        ],
      },
      {
        name: "beneficiary",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "incrementNonce",
    inputs: [{ name: "key", type: "uint192", internalType: "uint192" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "innerHandleOp",
    inputs: [
      { name: "callData", type: "bytes", internalType: "bytes" },
      {
        name: "opInfo",
        type: "tuple",
        internalType: "struct EntryPoint.UserOpInfo",
        components: [
          {
            name: "mUserOp",
            type: "tuple",
            internalType: "struct EntryPoint.MemoryUserOp",
            components: [
              {
                name: "sender",
                type: "address",
                internalType: "address",
              },
              {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "verificationGasLimit",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "callGasLimit",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "paymasterVerificationGasLimit",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "paymasterPostOpGasLimit",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "preVerificationGas",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "paymaster",
                type: "address",
                internalType: "address",
              },
              {
                name: "maxFeePerGas",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "maxPriorityFeePerGas",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "userOpHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          { name: "prefund", type: "uint256", internalType: "uint256" },
          {
            name: "contextOffset",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "preOpGas", type: "uint256", internalType: "uint256" },
        ],
      },
      { name: "context", type: "bytes", internalType: "bytes" },
    ],
    outputs: [
      {
        name: "actualGasCost",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "nonceSequenceNumber",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint192", internalType: "uint192" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "unlockStake",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawStake",
    inputs: [
      {
        name: "withdrawAddress",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawTo",
    inputs: [
      {
        name: "withdrawAddress",
        type: "address",
        internalType: "address payable",
      },
      {
        name: "withdrawAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AccountDeployed",
    inputs: [
      {
        name: "userOpHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "factory",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "paymaster",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BeforeExecution",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "Deposited",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "totalDeposit",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PostOpRevertReason",
    inputs: [
      {
        name: "userOpHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "revertReason",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SignatureAggregatorChanged",
    inputs: [
      {
        name: "aggregator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "StakeLocked",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "totalStaked",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "unstakeDelaySec",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "StakeUnlocked",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "withdrawTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "StakeWithdrawn",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "withdrawAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserOperationEvent",
    inputs: [
      {
        name: "userOpHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "paymaster",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "success",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "actualGasCost",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "actualGasUsed",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserOperationPrefundTooLow",
    inputs: [
      {
        name: "userOpHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserOperationRevertReason",
    inputs: [
      {
        name: "userOpHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "revertReason",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Withdrawn",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "withdrawAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "DelegateAndRevert",
    inputs: [
      { name: "success", type: "bool", internalType: "bool" },
      { name: "ret", type: "bytes", internalType: "bytes" },
    ],
  },
  {
    type: "error",
    name: "FailedOp",
    inputs: [
      { name: "opIndex", type: "uint256", internalType: "uint256" },
      { name: "reason", type: "string", internalType: "string" },
    ],
  },
  {
    type: "error",
    name: "FailedOpWithRevert",
    inputs: [
      { name: "opIndex", type: "uint256", internalType: "uint256" },
      { name: "reason", type: "string", internalType: "string" },
      { name: "inner", type: "bytes", internalType: "bytes" },
    ],
  },
  {
    type: "error",
    name: "PostOpReverted",
    inputs: [{ name: "returnData", type: "bytes", internalType: "bytes" }],
  },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  {
    type: "error",
    name: "SenderAddressResult",
    inputs: [{ name: "sender", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "SignatureValidationFailed",
    inputs: [{ name: "aggregator", type: "address", internalType: "address" }],
  },
];
export const gameAccountABI = [
  {
    "type": "constructor",
    "inputs": [
      { "name": "_owner", "type": "address", "internalType": "address" },
      { "name": "_userName", "type": "string", "internalType": "string" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "count",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "fundMe",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "increment",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "joinLobby",
    "inputs": [
      {
        "name": "lobbyAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "nickName", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "kill",
    "inputs": [
      {
        "name": "lobbyAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "target", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "payout",
    "inputs": [
      { "name": "lobbyAddress", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "userName",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "validateUserOp",
    "inputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct PackedUserOperation",
        "components": [
          { "name": "sender", "type": "address", "internalType": "address" },
          { "name": "nonce", "type": "uint256", "internalType": "uint256" },
          { "name": "initCode", "type": "bytes", "internalType": "bytes" },
          { "name": "callData", "type": "bytes", "internalType": "bytes" },
          {
            "name": "accountGasLimits",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "preVerificationGas",
            "type": "uint256",
            "internalType": "uint256"
          },
          { "name": "gasFees", "type": "bytes32", "internalType": "bytes32" },
          {
            "name": "paymasterAndData",
            "type": "bytes",
            "internalType": "bytes"
          },
          { "name": "signature", "type": "bytes", "internalType": "bytes" }
        ]
      },
      { "name": "", "type": "bytes32", "internalType": "bytes32" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      {
        "name": "validationData",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "vote",
    "inputs": [
      {
        "name": "lobbyAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "target", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
];

export const lobbyFactoryABI = [
  {
    "type": "function",
    "name": "createLobby",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deployedLobbies",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [
      { "name": "owner", "type": "address", "internalType": "address" },
      {
        "name": "lobbyAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "gameFinished", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDeployedLobbies",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct LobbyFactory.LobbyInfo[]",
        "components": [
          { "name": "owner", "type": "address", "internalType": "address" },
          {
            "name": "lobbyAddress",
            "type": "address",
            "internalType": "address"
          },
          { "name": "gameFinished", "type": "bool", "internalType": "bool" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "lobbyToIndex",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "ownerToLobby",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "updateLobbyInfo",
    "inputs": [
      {
        "name": "_lobbyAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_gameFinished", "type": "bool", "internalType": "bool" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
];

export const lobbyABI = [
  {
    "type": "function",
    "name": "addresstoplayerMap",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [
      { "name": "nickname", "type": "string", "internalType": "string" },
      { "name": "userAddress", "type": "address", "internalType": "address" },
      { "name": "role", "type": "uint8", "internalType": "enum Lobby.Role" },
      { "name": "votes", "type": "uint256", "internalType": "uint256" },
      { "name": "isPaid", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "gameFinished",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPlayers",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct Lobby.Player[]",
        "components": [
          { "name": "nickname", "type": "string", "internalType": "string" },
          {
            "name": "userAddress",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "role",
            "type": "uint8",
            "internalType": "enum Lobby.Role"
          },
          { "name": "votes", "type": "uint256", "internalType": "uint256" },
          { "name": "isPaid", "type": "bool", "internalType": "bool" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "gunduz",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "highestVote",
    "inputs": [],
    "outputs": [
      { "name": "voteNumber", "type": "uint256", "internalType": "uint256" },
      { "name": "playerNickname", "type": "string", "internalType": "string" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "joinLobby",
    "inputs": [
      { "name": "_nickName", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "kill",
    "inputs": [
      { "name": "target", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "payout",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "playerCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "playerMap",
    "inputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "outputs": [
      { "name": "nickname", "type": "string", "internalType": "string" },
      { "name": "userAddress", "type": "address", "internalType": "address" },
      { "name": "role", "type": "uint8", "internalType": "enum Lobby.Role" },
      { "name": "votes", "type": "uint256", "internalType": "uint256" },
      { "name": "isPaid", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "players",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [
      { "name": "nickname", "type": "string", "internalType": "string" },
      { "name": "userAddress", "type": "address", "internalType": "address" },
      { "name": "role", "type": "uint8", "internalType": "enum Lobby.Role" },
      { "name": "votes", "type": "uint256", "internalType": "uint256" },
      { "name": "isPaid", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "targets",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "timeCounter",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "vampireCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "villagerCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "vote",
    "inputs": [
      { "name": "target", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "voteCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "Dispacth",
    "inputs": [
      {
        "name": "suspect",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "gameStarted",
    "inputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "murdered",
    "inputs": [
      {
        "name": "victim",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  { "type": "event", "name": "timeUpdate", "inputs": [], "anonymous": false },
  {
    "type": "event",
    "name": "vampireFound",
    "inputs": [
      {
        "name": "vampireNickname",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  }
];
