import { Abi } from "viem"
export const DWORK_ADDRESS_POLYGON =
  "0x7043ad5746CE5FB84B84CfE80C3030adfA2470cF"
export const DWORK_SHARES_ADDRESS_POLYGON =
  "0xc75d7685EB02216B1D273337D31be185A4A48a24"
export const WORK_VERIFIER_ADDRESS_POLYGON =
  "0xa81bcb1DCbe2956E2e332ea83BC661Eb045A95bd"

export const USDC_ADDRESS_POLYGON = "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582"

export const DWORK_ADDRESS_OPTIMISM = ""
export const DWORK_SHARES_ADDRESS_OPTIMISM = ""

export const DWORK_ABI: Abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_workSharesManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_workVerifier",
        type: "address",
        internalType: "address",
      },
      {
        name: "_uscdUsdpriceFeed",
        type: "address",
        internalType: "address",
      },
      {
        name: "_ccipRouterAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_linkTokenAddress",
        type: "address",
        internalType: "address",
      },
      { name: "_usdcAddress", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buyWorkToken",
    inputs: [
      { name: "_workTokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ccipReceive",
    inputs: [
      {
        name: "message",
        type: "tuple",
        internalType: "struct Client.Any2EVMMessage",
        components: [
          {
            name: "messageId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "sourceChainSelector",
            type: "uint64",
            internalType: "uint64",
          },
          { name: "sender", type: "bytes", internalType: "bytes" },
          { name: "data", type: "bytes", internalType: "bytes" },
          {
            name: "destTokenAmounts",
            type: "tuple[]",
            internalType: "struct Client.EVMTokenAmount[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkLog",
    inputs: [
      {
        name: "log",
        type: "tuple",
        internalType: "struct Log",
        components: [
          { name: "index", type: "uint256", internalType: "uint256" },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "txHash", type: "bytes32", internalType: "bytes32" },
          {
            name: "blockNumber",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "blockHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          { name: "source", type: "address", internalType: "address" },
          {
            name: "topics",
            type: "bytes32[]",
            internalType: "bytes32[]",
          },
          { name: "data", type: "bytes", internalType: "bytes" },
        ],
      },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [
      { name: "upkeepNeeded", type: "bool", internalType: "bool" },
      { name: "performData", type: "bytes", internalType: "bytes" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createWorkShares",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_shareSupply",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_sharePriceUsd",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "enableChain",
    inputs: [
      {
        name: "_chainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_xWorkAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getApproved",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastTokenId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastTokenizationRequestId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenizationRequest",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TokenizedAsset.TokenizedWork",
        components: [
          {
            name: "customerSubmissionIPFSHash",
            type: "string",
            internalType: "string",
          },
          {
            name: "appraiserReportIPFSHash",
            type: "string",
            internalType: "string",
          },
          {
            name: "certificateIPFSHash",
            type: "string",
            internalType: "string",
          },
          { name: "owner", type: "address", internalType: "address" },
          { name: "ownerName", type: "string", internalType: "string" },
          {
            name: "lastWorkPriceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "workTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sharesTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "listingPriceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "isMinted", type: "bool", internalType: "bool" },
          {
            name: "isFractionalized",
            type: "bool",
            internalType: "bool",
          },
          { name: "isPaused", type: "bool", internalType: "bool" },
          { name: "isListed", type: "bool", internalType: "bool" },
          {
            name: "lastVerifiedAt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "verificationStep",
            type: "uint8",
            internalType: "enum TokenizedAsset.VerificationStep",
          },
          {
            name: "certificate",
            type: "tuple",
            internalType: "struct TokenizedAsset.WorkCertificate",
            components: [
              {
                name: "artist",
                type: "string",
                internalType: "string",
              },
              { name: "work", type: "string", internalType: "string" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenizationRequestByWorkId",
    inputs: [{ name: "_workId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TokenizedAsset.TokenizedWork",
        components: [
          {
            name: "customerSubmissionIPFSHash",
            type: "string",
            internalType: "string",
          },
          {
            name: "appraiserReportIPFSHash",
            type: "string",
            internalType: "string",
          },
          {
            name: "certificateIPFSHash",
            type: "string",
            internalType: "string",
          },
          { name: "owner", type: "address", internalType: "address" },
          { name: "ownerName", type: "string", internalType: "string" },
          {
            name: "lastWorkPriceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "workTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sharesTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "listingPriceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "isMinted", type: "bool", internalType: "bool" },
          {
            name: "isFractionalized",
            type: "bool",
            internalType: "bool",
          },
          { name: "isPaused", type: "bool", internalType: "bool" },
          { name: "isListed", type: "bool", internalType: "bool" },
          {
            name: "lastVerifiedAt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "verificationStep",
            type: "uint8",
            internalType: "enum TokenizedAsset.VerificationStep",
          },
          {
            name: "certificate",
            type: "tuple",
            internalType: "struct TokenizedAsset.WorkCertificate",
            components: [
              {
                name: "artist",
                type: "string",
                internalType: "string",
              },
              { name: "work", type: "string", internalType: "string" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenizationRequestIdByWorkTokenId",
    inputs: [
      { name: "_workTokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUsdcPrice",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUsdcValueOfUsd",
    inputs: [{ name: "usdAmount", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "operator", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "listWorkToken",
    inputs: [
      {
        name: "_workTokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_listPriceUsd",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "onERC721Received",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "from", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes4", internalType: "bytes4" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "openTokenizationRequest",
    inputs: [
      {
        name: "_customerSubmissionIPFSHash",
        type: "string",
        internalType: "string",
      },
      {
        name: "_appraiserReportIPFSHash",
        type: "string",
        internalType: "string",
      },
      {
        name: "_certificateIPFSHash",
        type: "string",
        internalType: "string",
      },
      { name: "_customer", type: "address", internalType: "address" },
    ],
    outputs: [
      {
        name: "tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "performUpkeep",
    inputs: [{ name: "performData", type: "bytes", internalType: "bytes" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestWorkVerification",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "approved", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCertificateIPFSHash",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_certificateIPFSHash",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setChainSelector",
    inputs: [
      { name: "_chainId", type: "uint256", internalType: "uint256" },
      { name: "_chainSelector", type: "uint64", internalType: "uint64" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setChainSharesManager",
    inputs: [
      {
        name: "_chainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_sharesManagerAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCustomerSubmissionIPFSHash",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_customerSubmissionIPFSHash",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setWorkSharesManager",
    inputs: [
      {
        name: "_workSharesManager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setWorkVerifier",
    inputs: [
      {
        name: "_workVerifier",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenURI",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unlistWorkToken",
    inputs: [
      { name: "_workTokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateLastAppraiserReportIPFSHash",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_newAppraiserReportIPFSHash",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "xChainWorkTokenTransfer",
    inputs: [
      { name: "_to", type: "address", internalType: "address" },
      { name: "_newOwnerName", type: "string", internalType: "string" },
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_destinationChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_payFeesIn",
        type: "uint8",
        internalType: "enum IDWorkConfig.PayFeesIn",
      },
      { name: "_gasLimit", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "messageId", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertificateExtractionError",
    inputs: [
      {
        name: "tokenizationRequestId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CrossChainReceived",
    inputs: [
      {
        name: "to",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sourceChainSelector",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CrossChainSent",
    inputs: [
      {
        name: "to",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "destinationChainSelector",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LastVerificationFailed",
    inputs: [
      {
        name: "previousOwner",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "previousPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newOwner",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "newPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VerificationProcess",
    inputs: [
      {
        name: "tokenizationRequestId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "step",
        type: "uint8",
        indexed: false,
        internalType: "enum TokenizedAsset.VerificationStep",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "WorkSharesCreated",
    inputs: [
      {
        name: "sharesTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "workTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "shareSupply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "WorkVerificationError",
    inputs: [
      {
        name: "tokenizationRequestId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ERC721IncorrectOwner",
    inputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
      { name: "owner", type: "address", internalType: "address" },
    ],
  },
  {
    type: "error",
    name: "ERC721InsufficientApproval",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "ERC721InvalidApprover",
    inputs: [{ name: "approver", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC721InvalidOperator",
    inputs: [{ name: "operator", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC721InvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC721InvalidReceiver",
    inputs: [{ name: "receiver", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC721InvalidSender",
    inputs: [{ name: "sender", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC721NonexistentToken",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  { type: "error", name: "dWork__AlreadyFractionalized", inputs: [] },
  { type: "error", name: "dWork__ChainNotEnabled", inputs: [] },
  { type: "error", name: "dWork__InvalidIPFSHash", inputs: [] },
  { type: "error", name: "dWork__InvalidRouter", inputs: [] },
  { type: "error", name: "dWork__NotEnoughBalanceForFees", inputs: [] },
  {
    type: "error",
    name: "dWork__NotEnoughTimePassedSinceLastVerification",
    inputs: [],
  },
  { type: "error", name: "dWork__NotEnoughValueSent", inputs: [] },
  { type: "error", name: "dWork__NotWorkOwner", inputs: [] },
  { type: "error", name: "dWork__NotZeroAddress", inputs: [] },
  { type: "error", name: "dWork__OnlyOnPolygonAmoy", inputs: [] },
  { type: "error", name: "dWork__ProcessOrderError", inputs: [] },
  { type: "error", name: "dWork__SenderNotEnabled", inputs: [] },
  { type: "error", name: "dWork__TokenPaused", inputs: [] },
  {
    type: "error",
    name: "dWork__TokenizationNotCompleted",
    inputs: [],
  },
  { type: "error", name: "dWork__TransferFailed", inputs: [] },
]

export const DWORK_SHARES_ABI: Abi = [
  {
    type: "constructor",
    inputs: [
      { name: "_baseUri", type: "string", internalType: "string" },
      { name: "_priceFeed", type: "address", internalType: "address" },
      {
        name: "_ccipRouterAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_linkTokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_currentChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      { name: "_usdc", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "id", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOfBatch",
    inputs: [
      {
        name: "accounts",
        type: "address[]",
        internalType: "address[]",
      },
      { name: "ids", type: "uint256[]", internalType: "uint256[]" },
    ],
    outputs: [{ name: "", type: "uint256[]", internalType: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "buyInitialShare",
    inputs: [
      {
        name: "_sharesTokenId",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_shareAmount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "buyMarketShareItem",
    inputs: [
      {
        name: "_marketShareItemId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "ccipReceive",
    inputs: [
      {
        name: "message",
        type: "tuple",
        internalType: "struct Client.Any2EVMMessage",
        components: [
          {
            name: "messageId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "sourceChainSelector",
            type: "uint64",
            internalType: "uint64",
          },
          { name: "sender", type: "bytes", internalType: "bytes" },
          { name: "data", type: "bytes", internalType: "bytes" },
          {
            name: "destTokenAmounts",
            type: "tuple[]",
            internalType: "struct Client.EVMTokenAmount[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createShares",
    inputs: [
      {
        name: "_workTokenId",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_workOwner", type: "address", internalType: "address" },
      {
        name: "_shareSupply",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_sharePriceUsd",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "enableChain",
    inputs: [
      {
        name: "_chainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_xWorkAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getDWorkAddress",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastMarketShareItemId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastTokenId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getListedItems",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct dWorkSharesManager.MarketShareItem[]",
        components: [
          { name: "itemId", type: "uint256", internalType: "uint256" },
          {
            name: "sharesTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "priceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "seller", type: "address", internalType: "address" },
          { name: "isSold", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMarketShareItemById",
    inputs: [
      {
        name: "_marketShareItemId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct dWorkSharesManager.MarketShareItem",
        components: [
          { name: "itemId", type: "uint256", internalType: "uint256" },
          {
            name: "sharesTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "priceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "seller", type: "address", internalType: "address" },
          { name: "isSold", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMarketShareItemIndex",
    inputs: [
      {
        name: "_marketShareItemId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNativeTokenPriceUsd",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSharesTokenIdByWorkId",
    inputs: [
      { name: "_workTokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "sharesTokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getWorkShareByWorkTokenId",
    inputs: [
      { name: "_workTokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IDWorkSharesManager.WorkShares",
        components: [
          {
            name: "maxShareSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sharePriceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "workTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalShareBought",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalSellValueUsd",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "workOwner",
            type: "address",
            internalType: "address",
          },
          {
            name: "redeemableValuePerShare",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "isPaused", type: "bool", internalType: "bool" },
          { name: "isRedeemable", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getWorkSharesByTokenId",
    inputs: [
      {
        name: "_sharesTokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IDWorkSharesManager.WorkShares",
        components: [
          {
            name: "maxShareSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sharePriceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "workTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalShareBought",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalSellValueUsd",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "workOwner",
            type: "address",
            internalType: "address",
          },
          {
            name: "redeemableValuePerShare",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "isPaused", type: "bool", internalType: "bool" },
          { name: "isRedeemable", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "operator", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "listMarketShareItem",
    inputs: [
      {
        name: "_sharesTokenId",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_priceUsd", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "marketShareItemId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onERC1155BatchReceived",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "from", type: "address", internalType: "address" },
      { name: "ids", type: "uint256[]", internalType: "uint256[]" },
      { name: "values", type: "uint256[]", internalType: "uint256[]" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes4", internalType: "bytes4" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onERC1155Received",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "from", type: "address", internalType: "address" },
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "value", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "bytes4", internalType: "bytes4" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onWorkSold",
    inputs: [
      {
        name: "_sharesTokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_sellValueUSDC",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pauseShares",
    inputs: [
      { name: "_workTokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeemAndBurnSharesForUSDC",
    inputs: [
      {
        name: "_shareTokenId",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_shareAmount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "s_listedShareItemIndex",
    inputs: [
      {
        name: "listedShareItem",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [{ name: "index", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "safeBatchTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "ids", type: "uint256[]", internalType: "uint256[]" },
      { name: "values", type: "uint256[]", internalType: "uint256[]" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "value", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "approved", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDWorkAddress",
    inputs: [{ name: "_dWork", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unlistMarketShareItem",
    inputs: [
      {
        name: "_marketShareItemId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unpauseShares",
    inputs: [
      { name: "_workTokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "uri",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MarketShareItemListed",
    inputs: [
      {
        name: "marketShareItemId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sharesTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "priceUsd",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "seller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MarketShareItemSold",
    inputs: [
      {
        name: "marketShareItemId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sharesTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "priceUsd",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "buyer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MarketShareItemUnlisted",
    inputs: [
      {
        name: "marketShareItemId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ShareBought",
    inputs: [
      {
        name: "sharesTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "buyer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesCreated",
    inputs: [
      {
        name: "sharesTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "maxShareSupply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "workTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "workOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesPaused",
    inputs: [
      {
        name: "workShares",
        type: "tuple",
        indexed: false,
        internalType: "struct IDWorkSharesManager.WorkShares",
        components: [
          {
            name: "maxShareSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "sharePriceUsd",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "workTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalShareBought",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "totalSellValueUsd",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "workOwner",
            type: "address",
            internalType: "address",
          },
          {
            name: "redeemableValuePerShare",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "isPaused", type: "bool", internalType: "bool" },
          { name: "isRedeemable", type: "bool", internalType: "bool" },
        ],
      },
      {
        name: "isPaused",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransferBatch",
    inputs: [
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "ids",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
      {
        name: "values",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransferSingle",
    inputs: [
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "id",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "URI",
    inputs: [
      {
        name: "value",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ERC1155InsufficientBalance",
    inputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "needed", type: "uint256", internalType: "uint256" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "ERC1155InvalidApprover",
    inputs: [{ name: "approver", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC1155InvalidArrayLength",
    inputs: [
      { name: "idsLength", type: "uint256", internalType: "uint256" },
      { name: "valuesLength", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "ERC1155InvalidOperator",
    inputs: [{ name: "operator", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC1155InvalidReceiver",
    inputs: [{ name: "receiver", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC1155InvalidSender",
    inputs: [{ name: "sender", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "ERC1155MissingApprovalForAll",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
    ],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  {
    type: "error",
    name: "dWorkSharesManager__ChainNotEnabled",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__InitialSaleClosed",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__InsufficientFunds",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__InvalidRouter",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__ItemAlreadySold",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__ItemNotListed",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__NotEnoughBalanceForFees",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__NotItemSeller",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__NotWorkContract",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__RedeemableValueExceeded",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__SellValueError",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__SenderNotEnabled",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__ShareNotRedeemable",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__SharesNotOwned",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__SharesPaused",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__TokenIdDoesNotExist",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__TransferFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "dWorkSharesManager__TransferFailedOnRedeem",
    inputs: [],
  },
]

export const WORK_VERIFIER_ABI: Abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_functionsRouter",
        type: "address",
        internalType: "address",
      },
      { name: "_donId", type: "bytes32", internalType: "bytes32" },
      {
        name: "_functionsSubId",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_secretReference",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_workVerificationSource",
        type: "string",
        internalType: "string",
      },
      {
        name: "_certificateExtractionSource",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getDWorkAddress",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastRequestId",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastVerifiedData",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IDWorkConfig.VerifiedWorkData",
        components: [
          { name: "artist", type: "string", internalType: "string" },
          { name: "work", type: "string", internalType: "string" },
          { name: "ownerName", type: "string", internalType: "string" },
          { name: "priceUsd", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRequestType",
    inputs: [
      {
        name: "tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum WorkVerifier.WorkCFRequestType",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSecretsReference",
    inputs: [],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenizationRequestId",
    inputs: [{ name: "requestId", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "handleOracleFulfillment",
    inputs: [
      { name: "requestId", type: "bytes32", internalType: "bytes32" },
      { name: "response", type: "bytes", internalType: "bytes" },
      { name: "err", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sendCertificateExtractionRequest",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_args", type: "string[]", internalType: "string[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sendWorkVerificationRequest",
    inputs: [
      {
        name: "_tokenizationRequestId",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_args", type: "string[]", internalType: "string[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDWorkAddress",
    inputs: [{ name: "_dWork", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateCFSubId",
    inputs: [
      {
        name: "_subscriptionId",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateCertificateExtractionSource",
    inputs: [{ name: "_newSource", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateDonId",
    inputs: [{ name: "_newDonId", type: "bytes32", internalType: "bytes32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateGasLimit",
    inputs: [{ name: "_newGasLimit", type: "uint32", internalType: "uint32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateSecretReference",
    inputs: [
      { name: "_secretReference", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateWorkVerificationSource",
    inputs: [{ name: "_newSource", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ChainlinkRequestSent",
    inputs: [
      {
        name: "requestId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RequestFulfilled",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RequestSent",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VerifierTaskDone",
    inputs: [
      {
        name: "tokenizationRequestId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "EmptyArgs", inputs: [] },
  { type: "error", name: "EmptySource", inputs: [] },
  { type: "error", name: "NoInlineSecrets", inputs: [] },
  { type: "error", name: "OnlyRouterCanFulfill", inputs: [] },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "dWorkVerifier__NotWorkContract", inputs: [] },
  {
    type: "error",
    name: "dWorkVerifier__UnexpectedRequestID",
    inputs: [{ name: "requestId", type: "bytes32", internalType: "bytes32" }],
  },
]

export const ERC20_ABI: Abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]
