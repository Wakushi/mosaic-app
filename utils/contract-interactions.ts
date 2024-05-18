import { createWalletClient, http, createPublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonAmoy } from "viem/chains";
import { DWORKFACTORY_ABI, DWORKFACTORY_ADRESS } from "@/lib/contract";
import { DWORK_ADRESS, DWORK_ABI } from "@/lib/contract";
import { updateArtworkStatus } from "@/utils/firebase-data";

const account = privateKeyToAccount((process.env.PRIVATE_KEY as `0x`) || "");

const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(process.env.ALCHEMY_URL),
});

const walletClient = createWalletClient({
  account,
  chain: polygonAmoy,
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
      functionName: "deployWork",
      args: [
        clientAddress,
        workName,
        workSymbol,
        customerSubmissionIPFSHash,
        appraiserReportIPFSHash,
      ],
    });

    const result = await walletClient.writeContract(deployWorkRequest);

    await updateArtworkStatus(workName, "processing");

    return result;
  } catch (error) {
    console.error("Error deploying work:", error);
    throw new Error("Failed to deploy work");
  }
}

export async function requestCertificateExtraction(args: string[]) {
  try {
    const { request: certificateExtractionRequest } =
      await publicClient.simulateContract({
        account: walletClient.account,
        address: DWORK_ADRESS,
        abi: DWORK_ABI,
        functionName: "requestCertificateExtraction",
        args: [args],
      });

    const result = await walletClient.writeContract(
      certificateExtractionRequest
    );

    await updateArtworkStatus(args[0], "verification pending");

    return result;
  } catch (error) {
    console.error("Error requesting certificate extraction:", error);
    throw new Error("Failed to request certificate extraction");
  }
}

export async function requestWorkVerification(title: string) {
  try {
    const { request: workVerificationRequest } =
      await publicClient.simulateContract({
        account: walletClient.account,
        address: DWORK_ADRESS,
        abi: DWORK_ABI,
        functionName: "requestWorkVerification",
        args: [],
      });

    const result = await walletClient.writeContract(workVerificationRequest);

    await updateArtworkStatus(title, "accepted");

    return result;
  } catch (error) {
    console.error("Error requesting work verification:", error);
    throw new Error("Failed to request work verification");
  }
}
