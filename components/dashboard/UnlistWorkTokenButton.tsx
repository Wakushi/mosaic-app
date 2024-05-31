import React, { forwardRef } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Artwork } from "@/types/artwork"
import { useToast } from "@/components/ui/use-toast"
import { unlistWorkToken } from "@/utils/user-contract-interactions"

interface UnlistWorkTokenButtonProps {
  artwork: Artwork
}

const UnlistWorkTokenButton = forwardRef<
  HTMLDivElement,
  UnlistWorkTokenButtonProps
>(({ artwork }, ref) => {
  const { toast } = useToast()

  const onUnlist = async () => {
    const workTokenId = artwork.tokenizationRequest?.workTokenId

    if (workTokenId === undefined) {
      toast({
        title: "Error",
        description: "Work token ID not found. Please try again later.",
      })
      return
    }

    try {
      await unlistWorkToken(workTokenId)
      toast({
        title: "Success",
        description: "Work token unlisted successfully!",
      })
    } catch (error) {
      console.error("Failed to unlist work token:", error)
      toast({
        title: "Error",
        description: "Failed to unlist work token. Please try again.",
      })
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="justify-start">
            Unlist work token
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlist Work Token</DialogTitle>
            <DialogDescription>
              Are you sure you want to unlist this work token?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onUnlist}>Unlist</Button>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
})

UnlistWorkTokenButton.displayName = "UnlistWorkTokenButton"

export default UnlistWorkTokenButton
