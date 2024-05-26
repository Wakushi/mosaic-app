'use client'
import { useEffect } from "react";
import { useUserStore } from "@/store/useStore";
import { useContractEvent } from "@/utils/useContractEvent";
import { DWORK_ABI, DWORK_ADDRESS } from "@/lib/contract";
import { useToast } from "@/components/ui/use-toast";

const ContractEventListener: React.FC = () => {
  const listening = useUserStore((state) => state.listening);
  const setListening = useUserStore((state) => state.setListening);
  const triggerRefresh = useUserStore((state) => state.triggerRefresh);
  const { toast } = useToast();

  useContractEvent({
    contractAddress: DWORK_ADDRESS,
    abi: DWORK_ABI,
    eventName: "TokenizationRequestOpened",
    eventCallback: () => {
      toast({
        title: "Success",
        description: "Tokenization request opened successfully",
      });
      triggerRefresh(); 
      setListening(false);
    },
  });

  useEffect(() => {
    if (listening) {
      console.log("Listening for contract events...");
    } else {
      console.log("Stopped listening for contract events.");
    }

    return () => {
      if (listening) {
        console.log("Cleaning up event listeners...");
      }
    };
  }, [listening]);

  return null;
};

export default ContractEventListener;
