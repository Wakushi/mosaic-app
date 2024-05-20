export const DWORK_ADRESS = "0xdC0C761c8fE6E430ab0FDE587c002c34038336dF";

export const DWORK_ABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_workSharesManager",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_workVerifier",
        "type": "address",
        "internalType": "address"
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
    "name": "burn",
    "inputs": [
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "bytes32ToString",
    "inputs": [
      { "name": "_bytes32", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "bytes32ToUint256",
    "inputs": [
      { "name": "_uint", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
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
    "name": "createWorkShares",
    "inputs": [
      {
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_shareSupply",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_sharePriceUsd",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "customerTokenizationRequests",
    "inputs": [
      { "name": "_customer", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "", "type": "uint256[]", "internalType": "uint256[]" }
    ],
    "stateMutability": "view"
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
    "name": "getLastTokenId",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastTokenizationRequestId",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastVerifierError",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLastVerifierResponse",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSharesTokenId",
    "inputs": [
      {
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTokenizationRequest",
    "inputs": [
      {
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct dWork.TokenizationRequest",
        "components": [
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
            "name": "certificateIPFSHash",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "customer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "initialOwnerName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "lastWorkPriceUsd",
            "type": "uint256",
            "internalType": "uint256"
          },
          { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
          {
            "name": "sharesTokenId",
            "type": "uint256",
            "internalType": "uint256"
          },
          { "name": "isMinted", "type": "bool", "internalType": "bool" },
          {
            "name": "isFractionalized",
            "type": "bool",
            "internalType": "bool"
          },
          { "name": "isPaused", "type": "bool", "internalType": "bool" },
          {
            "name": "lastVerifiedAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "verificationStep",
            "type": "uint8",
            "internalType": "enum dWork.VerificationStep"
          },
          {
            "name": "certificate",
            "type": "tuple",
            "internalType": "struct dWork.WorkCertificate",
            "components": [
              {
                "name": "artist",
                "type": "string",
                "internalType": "string"
              },
              { "name": "work", "type": "string", "internalType": "string" }
            ]
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTokenizationRequestByWorkTokenId",
    "inputs": [
      { "name": "_workTokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct dWork.TokenizationRequest",
        "components": [
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
            "name": "certificateIPFSHash",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "customer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "initialOwnerName",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "lastWorkPriceUsd",
            "type": "uint256",
            "internalType": "uint256"
          },
          { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
          {
            "name": "sharesTokenId",
            "type": "uint256",
            "internalType": "uint256"
          },
          { "name": "isMinted", "type": "bool", "internalType": "bool" },
          {
            "name": "isFractionalized",
            "type": "bool",
            "internalType": "bool"
          },
          { "name": "isPaused", "type": "bool", "internalType": "bool" },
          {
            "name": "lastVerifiedAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "verificationStep",
            "type": "uint8",
            "internalType": "enum dWork.VerificationStep"
          },
          {
            "name": "certificate",
            "type": "tuple",
            "internalType": "struct dWork.WorkCertificate",
            "components": [
              {
                "name": "artist",
                "type": "string",
                "internalType": "string"
              },
              { "name": "work", "type": "string", "internalType": "string" }
            ]
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTokenizationRequestStatus",
    "inputs": [
      {
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "getWorkSharesManager",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
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
    "inputs": [
      {
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isMinted",
    "inputs": [
      {
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "openTokenizationRequest",
    "inputs": [
      {
        "name": "_customerSubmissionIPFSHash",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_appraiserReportIPFSHash",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "_certificateIPFSHash",
        "type": "string",
        "internalType": "string"
      },
      { "name": "_customer", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      {
        "name": "tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
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
    "name": "requestWorkVerification",
    "inputs": [
      {
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "s_lastPerformData",
    "inputs": [],
    "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
    "stateMutability": "view"
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
    "name": "setWorkSharesTokenId",
    "inputs": [
      {
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      },
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
    "name": "toBytes",
    "inputs": [
      { "name": "_data", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [{ "name": "", "type": "bytes", "internalType": "bytes" }],
    "stateMutability": "pure"
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
        "name": "_tokenizationRequestId",
        "type": "uint256",
        "internalType": "uint256"
      },
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
    "name": "BatchMetadataUpdate",
    "inputs": [
      {
        "name": "_fromTokenId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "_toTokenId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateExtracted",
    "inputs": [
      {
        "name": "tokenizationRequestId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "certificate",
        "type": "tuple",
        "indexed": false,
        "internalType": "struct dWork.WorkCertificate",
        "components": [
          { "name": "artist", "type": "string", "internalType": "string" },
          { "name": "work", "type": "string", "internalType": "string" }
        ]
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateExtractionError",
    "inputs": [
      {
        "name": "tokenizationRequestId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
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
    "name": "MetadataUpdate",
    "inputs": [
      {
        "name": "_tokenId",
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
        "name": "tokenizationRequestId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
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
    "name": "WorkSharesCreated",
    "inputs": [
      {
        "name": "sharesTokenId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "workTokenId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "shareSupply",
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
        "name": "tokenizationRequestId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "WorkVerificationError",
    "inputs": [
      {
        "name": "tokenizationRequestId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
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
  { "type": "error", "name": "dWork__AlreadyFractionalized", "inputs": [] },
  {
    "type": "error",
    "name": "dWork__NotEnoughTimePassedSinceLastVerification",
    "inputs": []
  },
  { "type": "error", "name": "dWork__NotZeroAddress", "inputs": [] },
  { "type": "error", "name": "dWork__ProcessOrderError", "inputs": [] },
  { "type": "error", "name": "dWork__TokenPaused", "inputs": [] },
  { "type": "error", "name": "dWork__WorkNotMinted", "inputs": [] },
  {
    "type": "error",
    "name": "dWork__WorkVerificationNotExpected",
    "inputs": []
  }
]