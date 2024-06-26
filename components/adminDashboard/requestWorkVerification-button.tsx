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
import { useWatchContractEvent } from "wagmi"
import { DWORK_ABI, DWORK_ADDRESS_POLYGON } from "@/lib/contract"
import { useUserStore } from "@/store/useStore"
import { Button } from "../ui/button"

interface RequestWorkVerificationButtonProps {
  artwork: Artwork
  refreshData: () => void
}

const RequestWorkVerificationButton = forwardRef<
  HTMLDivElement,
  RequestWorkVerificationButtonProps
>(({ artwork, refreshData }, ref) => {
  const [isRequesting, setIsRequesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [alertOpen, setAlertOpen] = useState(false)
  const { toast } = useToast()
  const triggerRefresh = useUserStore((state) => state.triggerRefresh)
  const setListening = useUserStore((state) => state.setListening)

  useWatchContractEvent({
    address: DWORK_ADDRESS_POLYGON,
    abi: DWORK_ABI,
    eventName: "WorkVerificationRequested",
    onLogs: () => {
      triggerRefresh()
      toast({
        title: "Success",
        description: "Work verification requested successfully",
      })
      setIsRequesting(false)
      setAlertOpen(false)
    },
  })

  const handleRequest = async () => {
    setIsRequesting(true)
    setError(null)

    try {
      if (artwork.tokenizationRequest) {
        const lastVerifiedAt = artwork.tokenizationRequest.lastVerifiedAt * 1000
        const now = Date.now()
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
        if (now - lastVerifiedAt < THIRTY_DAYS) {
          toast({
            title: "Error",
            description: `You can only request work verification once a month (last requested on ${new Date(
              lastVerifiedAt
            ).toLocaleDateString()})`,
          })
          setIsRequesting(false)
          return
        }
      }

      setListening(true)
      const response = await fetch("/api/admin/requestWorkVerification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenizationRequestId: artwork.tokenizationRequestId,
          title: artwork.title,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to request work verification")
      }
    } catch (err) {
      console.error(err)
      setError((err as Error).message)

      toast({
        title: "Error",
        description:
          "Failed to request work verification: " + (err as Error).message,
      })
      setIsRequesting(false)
      setAlertOpen(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setAlertOpen(true)}
        variant="ghost"
        className="justify-start"
      >
        Request Work Verification
      </Button>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will request the work verification. It cannot be
              undone.
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

RequestWorkVerificationButton.displayName = "RequestWorkVerificationButton"

export default RequestWorkVerificationButton
