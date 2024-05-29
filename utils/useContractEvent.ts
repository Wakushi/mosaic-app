import { useEffect } from "react"
import { useWatchContractEvent } from "wagmi"
import { Abi, Log } from "viem"
import { DWORK_ABI } from "@/lib/contract"

interface UseContractEventOptions {
  contractAddress: `0x${string}`
  abi: Abi
  eventName: string
  eventCallback: (logs: Log[]) => void
}

export function useContractEvent({
  contractAddress,
  abi,
  eventName,
  eventCallback,
}: UseContractEventOptions) {
  useWatchContractEvent({
    address: contractAddress,
    abi: DWORK_ABI,
    eventName,
    onLogs: (logs) => {
      console.log("Event logs:", logs)
      eventCallback(logs)
    },
  })
}
