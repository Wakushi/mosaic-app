export const DWORKFACTORY_ADRESS = "0x960F9bFcCeC2ca1271482E95512F456D3d9F9890";

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

export const DWORK_ADRESS = "0xCC05595F8EC6C2b9816675334127474124B22da0";

export const DWORK_ABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_config",
        "type": "tuple",
        "internalType": "struct IDWorkConfig.dWorkConfig",
        "components": [
          { "name": "owner", "type": "address", "internalType": "address" },
          {
            "name": "customerSubmissionIPFSHash",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "appraiserReportIPFSHash",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "customer",
            "type": "address",
            "internalType": "address"
          },
          { "name": "workName", "type": "string", "internalType": "string" },
          {
            "name": "workSymbol",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "factoryAddress",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "workSharesManagerAddress",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "workVerifierAddress",
            "type": "address",
            "internalType": "address"
          }
        ]
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "bytes32ToAddress",
    "inputs": [
      { "name": "_address", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "checkLog",
    "inputs": [
      {
        "name": "log",
        "type": "tuple",
        "internalType": "struct Log",
        "components": [
          { "name": "index", "type": "uint256", "internalType": "uint256" },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          { "name": "txHash", "type": "bytes32", "internalType": "bytes32" },
          {
            "name": "blockNumber",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "blockHash",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          { "name": "source", "type": "address", "internalType": "address" },
          {
            "name": "topics",
            "type": "bytes32[]",
            "internalType": "bytes32[]"
          },
          { "name": "data", "type": "bytes", "internalType": "bytes" }
        ]
      },
      { "name": "", "type": "bytes", "internalType": "bytes" }
    ],
    "outputs": [
      { "name": "upkeepNeeded", "type": "bool", "internalType": "bool" },
      { "name": "performData", "type": "bytes", "internalType": "bytes" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "fulfillCertificateExtractionRequest",
    "inputs": [
      { "name": "requestId", "type": "bytes32", "internalType": "bytes32" },
      { "name": "response", "type": "bytes", "internalType": "bytes" },
      { "name": "err", "type": "bytes", "internalType": "bytes" },
      {
        "name": "certificateImageHash",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "fulfillWorkVerificationRequest",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getApproved",
    "inputs": [
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCertificate",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct dWork.WorkCertificate",
        "components": [
          { "name": "artist", "type": "string", "internalType": "string" },
          { "name": "work", "type": "string", "internalType": "string" },
          { "name": "year", "type": "uint256", "internalType": "uint256" },
          { "name": "imageURL", "type": "string", "internalType": "string" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCustomerSubmissionIPFSHash",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastAppraiserReportIPFSHash",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastError",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastResponse",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastVerifiedAt",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSharesTokenId",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTokenizedWork",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct dWork.TokenizedWork",
        "components": [
          { "name": "artist", "type": "string", "internalType": "string" },
          { "name": "work", "type": "string", "internalType": "string" },
          { "name": "ownerName", "type": "string", "internalType": "string" },
          {
            "name": "workPriceUsd",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getVerificationStep",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "enum dWork.VerificationStep"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getWorkFactoryAddress",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getWorkOwner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getWorkPriceUsd",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getWorkSharesManagerAddress",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getWorkVerifierAddress",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isApprovedForAll",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" },
      { "name": "operator", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isFractionalized",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isMinted",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
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
    "name": "ownerOf",
    "inputs": [
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "paused",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "performUpkeep",
    "inputs": [
      { "name": "performData", "type": "bytes", "internalType": "bytes" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
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
    "name": "requestCertificateExtraction",
    "inputs": [
      { "name": "_args", "type": "string[]", "internalType": "string[]" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "requestWorkVerification",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "inputs": [
      { "name": "from", "type": "address", "internalType": "address" },
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "safeTransferFrom",
    "inputs": [
      { "name": "from", "type": "address", "internalType": "address" },
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
      { "name": "data", "type": "bytes", "internalType": "bytes" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setApprovalForAll",
    "inputs": [
      { "name": "operator", "type": "address", "internalType": "address" },
      { "name": "approved", "type": "bool", "internalType": "bool" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setWorkSharesTokenId",
    "inputs": [
      {
        "name": "_sharesTokenId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "inputs": [
      { "name": "interfaceId", "type": "bytes4", "internalType": "bytes4" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tokenURI",
    "inputs": [
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      { "name": "from", "type": "address", "internalType": "address" },
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
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
    "type": "function",
    "name": "updateLastAppraiserReportIPFSHash",
    "inputs": [
      {
        "name": "_newAppraiserReportIPFSHash",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "approved",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ApprovalForAll",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "approved",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateExtracted",
    "inputs": [
      {
        "name": "certificate",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct dWork.WorkCertificate",
        "components": [
          { "name": "artist", "type": "string", "internalType": "string" },
          { "name": "work", "type": "string", "internalType": "string" },
          { "name": "year", "type": "uint256", "internalType": "uint256" },
          { "name": "imageURL", "type": "string", "internalType": "string" }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ChainlinkResponse",
    "inputs": [
      {
        "name": "requestId",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "response",
        "type": "bytes",
        "indexed": false,
        "internalType": "bytes"
      },
      {
        "name": "err",
        "type": "bytes",
        "indexed": false,
        "internalType": "bytes"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LastVerificationFailed",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "previousPrice",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "newOwner",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "newPrice",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
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
    "name": "Paused",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Unpaused",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "VerificationProcess",
    "inputs": [
      {
        "name": "step",
        "type": "uint8",
        "indexed": false,
        "internalType": "enum dWork.VerificationStep"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "WorkFractionalized",
    "inputs": [
      {
        "name": "sharesTokenId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "WorkTokenized",
    "inputs": [
      {
        "name": "tokenizedWork",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct dWork.TokenizedWork",
        "components": [
          { "name": "artist", "type": "string", "internalType": "string" },
          { "name": "work", "type": "string", "internalType": "string" },
          { "name": "ownerName", "type": "string", "internalType": "string" },
          {
            "name": "workPriceUsd",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "ERC721IncorrectOwner",
    "inputs": [
      { "name": "sender", "type": "address", "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
      { "name": "owner", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC721InsufficientApproval",
    "inputs": [
      { "name": "operator", "type": "address", "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "ERC721InvalidApprover",
    "inputs": [
      { "name": "approver", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC721InvalidOperator",
    "inputs": [
      { "name": "operator", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC721InvalidOwner",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC721InvalidReceiver",
    "inputs": [
      { "name": "receiver", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC721InvalidSender",
    "inputs": [
      { "name": "sender", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC721NonexistentToken",
    "inputs": [
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ]
  },
  { "type": "error", "name": "EnforcedPause", "inputs": [] },
  { "type": "error", "name": "ExpectedPause", "inputs": [] },
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
  { "type": "error", "name": "dWork__AlreadyMinted", "inputs": [] },
  {
    "type": "error",
    "name": "dWork__NotEnoughTimePassedSinceLastVerification",
    "inputs": []
  },
  { "type": "error", "name": "dWork__NotOwnerOrFactory", "inputs": [] },
  { "type": "error", "name": "dWork__NotWorkOwner", "inputs": [] },
  { "type": "error", "name": "dWork__NotWorkVerifier", "inputs": [] },
  { "type": "error", "name": "dWork__ProcessOrderError", "inputs": [] },
  {
    "type": "error",
    "name": "dWork__WorkVerificationNotExpected",
    "inputs": []
  }
]