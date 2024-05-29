import React, { forwardRef, useState } from "react"
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
import { TransferWorkTokenForm } from "./transfer-token-form"

interface TransferTokenButtonProps {
  artwork: Artwork
}

const TransferWorkTokenButton = forwardRef<
  HTMLDivElement,
  TransferTokenButtonProps
>(({ artwork }, ref) => {
  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <div className="p-1 text-sm cursor-pointer">Transfer work token</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer work token</DialogTitle>
            <DialogDescription>
              Fill in the details to transfer the work token.
            </DialogDescription>
          </DialogHeader>
          <TransferWorkTokenForm artwork={artwork} closeModal={toggleModal} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
})

export default TransferWorkTokenButton
