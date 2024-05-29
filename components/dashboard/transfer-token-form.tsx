import { ReusableForm } from "@/components/clientUi/form"
import { Artwork } from "@/types/artwork"
import { z } from "zod"
import { useAccount } from "wagmi"
import { useToast } from "@/components/ui/use-toast"
import { xChainWorkTokenTransfer } from "@/utils/user-contract-interactions"
import { ToastAction } from "../ui/toast"
import { CCIP_EXPLORER_URL } from "@/utils/constants"

const formSchema = z.object({
  recipient: z.string(),
  newOwnerName: z.string(),
  destinationChain: z.string(),
})

const fieldsData = [
  {
    name: "recipient",
    label: "Recipient Address",
    description: "Address of the recipient.",
    type: "string",
  },
  {
    name: "newOwnerName",
    label: "New Owner Name",
    description: "Name of the new owner.",
    type: "string",
  },
  {
    name: "destinationChain",
    label: "Destination Chain",
    description: "Chain to transfer the token to.",
    type: "select",
    options: [
      { id: "16281711391670634445", label: "Polygon Amoy" },
      { id: "5224473277236331295", label: "Optimism Sepolia" },
    ],
  },
]

type FormValues = z.infer<typeof formSchema>

interface TransferWorkTokenFormProps {
  artwork: Artwork
  closeModal: () => void
}

export function TransferWorkTokenForm({
  artwork,
  closeModal,
}: TransferWorkTokenFormProps) {
  const { toast } = useToast()

  const onSubmit = async (values: FormValues) => {
    try {
      if (!artwork?.tokenizationRequestId) {
        throw new Error("Invalid tokenization request ID.")
      }
      const hash = await xChainWorkTokenTransfer(
        values.recipient,
        values.newOwnerName,
        artwork.tokenizationRequestId,
        values.destinationChain
      )
      console.log("Transfer hash:", hash)
      toast({
        title: "Success",
        description: "Work token transferred successfully.",
        action: (
          <ToastAction
            altText="See on explorer"
            onClick={() => window.open(`${CCIP_EXPLORER_URL}${hash}`, "_blank")}
          >
            See on explorer
          </ToastAction>
        ),
      })

      closeModal()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return (
    <ReusableForm
      schema={formSchema}
      defaultValues={{ recipient: "", newOwnerName: "", destinationChain: "" }}
      onSubmit={onSubmit}
      fields={fieldsData}
    />
  )
}
