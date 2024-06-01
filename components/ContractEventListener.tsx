"use client"
import { useEffect } from "react"
import { useUserStore } from "@/store/useStore"
import { useContractEvent } from "@/utils/useContractEvent"
import {
  DWORK_ABI,
  DWORK_ADDRESS_POLYGON,
  WORK_VERIFIER_ABI,
  WORK_VERIFIER_ADDRESS_POLYGON,
} from "@/lib/contract"
import { useToast } from "@/components/ui/use-toast"

const ContractEventListener: React.FC = () => {
  const listening = useUserStore((state) => state.listening)
  const setListening = useUserStore((state) => state.setListening)
  const triggerRefresh = useUserStore((state) => state.triggerRefresh)
  const { toast } = useToast()

  useContractEvent({
    contractAddress: DWORK_ADDRESS_POLYGON,
    abi: DWORK_ABI,
    eventName: "TokenizationRequestOpened",
    eventCallback: () => {
      toast({
        title: "Success",
        description: "Tokenization request opened successfully",
      })
      triggerRefresh()
      setListening(false)
    },
  })

  useContractEvent({
    contractAddress: DWORK_ADDRESS_POLYGON,
    abi: DWORK_ABI,
    eventName: "WorkVerificationError",
    eventCallback: (logs) => {
      console.log("Work verification error logs:", logs)
      toast({
        title: "Error",
        description: "Work verification failed",
      })
      setListening(false)
    },
  })

  useContractEvent({
    contractAddress: WORK_VERIFIER_ADDRESS_POLYGON,
    abi: WORK_VERIFIER_ABI,
    eventName: "VerifierTaskDone",
    eventCallback: (logs) => {
      console.log("Work verifier: ", logs)
      toast({
        title: "Verification finished",
        description: "Work verification finished successfully",
      })
      setListening(false)
    },
  })

  useContractEvent({
    contractAddress: DWORK_ADDRESS_POLYGON,
    abi: DWORK_ABI,
    eventName: "VerificationProcess",
    eventCallback: () => {
      triggerRefresh()
    },
  })

  useEffect(() => {
    if (listening) {
      console.log("Listening for contract events...")
    } else {
      console.log("Stopped listening for contract events.")
    }

    return () => {
      if (listening) {
        console.log("Cleaning up event listeners...")
      }
    }
  }, [listening])

  return null
}

export default ContractEventListener
