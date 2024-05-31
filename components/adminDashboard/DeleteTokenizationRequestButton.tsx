import { useState, forwardRef } from "react"
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
import { useUserStore } from "@/store/useStore"
import { Button } from "../ui/button"

interface DeleteWorkTokenizationButtonProps {
  tokenizationRequestId: string
  refreshData: () => void
}

const DeleteWorkTokenizationButton = forwardRef<
  HTMLDivElement,
  DeleteWorkTokenizationButtonProps
>(({ tokenizationRequestId, refreshData }, ref) => {
  const [isRequesting, setIsRequesting] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const { toast } = useToast()
  const triggerRefresh = useUserStore((state) => state.triggerRefresh)

  const handleRequest = async () => {
    setIsRequesting(true)

    try {
      const response = await fetch(
        `/api/artwork?tokenizationRequestId=${tokenizationRequestId}`,
        {
          method: "DELETE",
        }
      )

      const result = await response.json()

      triggerRefresh()
      toast({
        title: "Success",
        description: "Tokenization request deleted successfully",
      })
      setIsRequesting(false)
      setAlertOpen(false)
      refreshData()
      if (!response.ok) {
        throw new Error(result.error || "Failed to delete tokenization request")
      }
    } catch (err) {
      console.error(err)

      toast({
        title: "Error",
        description:
          "Failed to delete tokenization request: " + (err as Error).message,
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
        Delete Tokenization Request
      </Button>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the tokenization request. This action is
              irreversible.
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

DeleteWorkTokenizationButton.displayName = "DeleteWorkTokenizationButton"

export default DeleteWorkTokenizationButton
