import { useState, forwardRef } from "react"
import { Artwork } from "@/types/artwork"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useContractEvent } from "@/utils/useContractEvent"
import { DWORK_ABI, DWORK_ADDRESS } from "@/lib/contract"

interface OpenTokenizationRequestButtonProps {
  artwork: Artwork
  refreshData: () => void
}

const OpenTokenizationRequestButton = forwardRef<
  HTMLDivElement,
  OpenTokenizationRequestButtonProps
>(({ artwork, refreshData }, ref) => {
  const [isRequesting, setIsRequesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [alertOpen, setAlertOpen] = useState(false)
  const { toast } = useToast()

  useContractEvent({
    contractAddress: DWORK_ADDRESS,
    abi: DWORK_ABI,
    eventName: "TokenizationRequestOpened",
    eventCallback: () => {
      refreshData()
      toast({
        title: "Success",
        description: "Tokenization request opened successfully",
      })
      setIsRequesting(false)
      setAlertOpen(false)
    },
  })

  useContractEvent({
    contractAddress: DWORK_ADDRESS,
    abi: DWORK_ABI,
    eventName: "VerificationProcess",
    eventCallback: () => {
      console.log("Verification process started")
      // refreshData()
      // setIsRequesting(false)
      // setAlertOpen(false)
    },
  })

  const handleRequest = async () => {
    setIsRequesting(true)
    setError(null)

    try {
      const hashResponse = await fetch(
        `/api/artwork/getHashesByTitle?title=${encodeURIComponent(
          artwork.title
        )}`
      )
      if (!hashResponse.ok) {
        throw new Error("Failed to retrieve hash data")
      }

      const hashData = await hashResponse.json()
      const { hashArtwork, hashReport, hashCertificate } = hashData

      if (!hashArtwork || !hashReport || !hashCertificate) {
        throw new Error("Missing required hash fields")
      }

      const response = await fetch("/api/admin/openTokenizationRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerSubmissionIPFSHash: hashArtwork,
          appraiserReportIPFSHash: hashReport,
          certificateIPFSHash: hashCertificate,
          clientAddress: artwork.clientAddress,
          artworkTitle: artwork.title,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to open tokenization request")
      }
    } catch (err) {
      console.error("Error opening tokenization request:", err)
      setError((err as Error).message)

      toast({
        title: "Error",
        description:
          "Failed to open tokenization request: " + (err as Error).message,
      })
      setIsRequesting(false)
      setAlertOpen(false)
    }
  }

  return (
    <>
      <div
        ref={ref}
        onClick={() => setAlertOpen(true)}
        className="p-1 text-sm cursor-pointer"
      >
        Open Tokenization Request
      </div>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will open the tokenization
              request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRequest}>
              {isRequesting ? "Requesting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
})

OpenTokenizationRequestButton.displayName = "OpenTokenizationRequestButton"

export default OpenTokenizationRequestButton
