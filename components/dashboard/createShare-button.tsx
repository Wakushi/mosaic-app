import { useState, forwardRef } from "react"
import { Artwork } from "@/types/artwork"
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
import { CreateSharesForm } from "./createShare-form"

interface CreateSharesButtonProps {
  artwork: Artwork
}

const CreateSharesButton = forwardRef<HTMLDivElement, CreateSharesButtonProps>(
  ({ artwork }, ref) => {
    const [modalOpen, setModalOpen] = useState(false)
    const toggleModal = () => setModalOpen(!modalOpen)

    return (
      <>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="justify-start">
              Create Shares
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Shares</DialogTitle>
              <DialogDescription>
                Fill in the details to create shares for the artwork.
              </DialogDescription>
            </DialogHeader>
            <CreateSharesForm artwork={artwork} closeModal={toggleModal} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }
)

CreateSharesButton.displayName = "CreateSharesButton"

export default CreateSharesButton
