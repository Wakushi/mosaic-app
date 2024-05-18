import { createWalletClient, http, createPublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { DWORKFACTORY_ABI, DWORKFACTORY_ADRESS } from "@/lib/contract";
import { updateArtworkStatus } from '@/utils/firebase-data';

const account = privateKeyToAccount((process.env.PRIVATE_KEY as `0x`) || "");

const publicClient = createPublicClient({
	chain: baseSepolia,
	transport: http(process.env.ALCHEMY_URL),
  })

const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(process.env.ALCHEMY_URL),
});

export async function deployWork(
	clientAddress: string,
	workName: string,
	workSymbol: string,
	customerSubmissionIPFSHash: string,
	appraiserReportIPFSHash: string
  ) {
	try {
	  const { request: deployWorkRequest } = await publicClient.simulateContract({
		account: walletClient.account,
		address: DWORKFACTORY_ADRESS,
		abi: DWORKFACTORY_ABI,
		functionName: 'deployWork',
		args: [clientAddress, workName, workSymbol, customerSubmissionIPFSHash, appraiserReportIPFSHash],
	  });
  
	  const result = await walletClient.writeContract(deployWorkRequest);
  
	  await updateArtworkStatus(workName, 'processing');
  
	  return result;
	} catch (error) {
	  console.error('Error deploying work:', error);
	  throw new Error('Failed to deploy work');
	}
  }
