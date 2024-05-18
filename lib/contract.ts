export const DWORKFACTORY_ADRESS = "0x743F21d0854EA3Db50917148C66C7A9d12f9478C";

export const DWORKFACTORY_ABI = [
    {
      "type": "constructor",
      "inputs": [
        { "name": "_priceFeed", "type": "address", "internalType": "address" },
        {
          "name": "_workVerifier",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_workSharesManager",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createWorkShares",
      "inputs": [
        {
          "name": "_workContract",
          "type": "address",
          "internalType": "address"
        },
        { "name": "_shareSupply", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "deployWork",
      "inputs": [
        { "name": "_customer", "type": "address", "internalType": "address" },
        { "name": "_workName", "type": "string", "internalType": "string" },
        { "name": "_workSymbol", "type": "string", "internalType": "string" },
        {
          "name": "_customerSubmissionIPFSHash",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_appraiserReportIPFSHash",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getCustomerWorks",
      "inputs": [
        { "name": "_customer", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "", "type": "address[]", "internalType": "address[]" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getWorkSharesManager",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getWorkSharesTokenId",
      "inputs": [
        {
          "name": "_workContract",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getWorkVerifier",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isWorkContract",
      "inputs": [
        {
          "name": "_workContract",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
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
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setWorkSharesManager",
      "inputs": [
        {
          "name": "_workSharesManager",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setWorkVerifier",
      "inputs": [
        {
          "name": "_workVerifier",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        { "name": "newOwner", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "WorkDeployed",
      "inputs": [
        {
          "name": "workAddress",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "customer",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "WorkSharesCreated",
      "inputs": [
        {
          "name": "sharesTokenId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "workContract",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [
        { "name": "account", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "dWorkFactory__WorkAlreadyFractionalized",
      "inputs": []
    },
    { "type": "error", "name": "dWorkFactory__WorkNotMinted", "inputs": [] },
    { "type": "error", "name": "dWorkFactory__WrongWorkPrice", "inputs": [] }
  ]