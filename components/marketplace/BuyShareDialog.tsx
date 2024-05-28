import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import Loader from "@/components/clientUi/Loader"
import { useToast } from "@/components/ui/use-toast"
import { parseEther } from "viem"
import { buyInitialShare } from "@/utils/user-contract-interactions"

interface BuyShareDialogProps {
  sharesTokenId: number
  sharePriceUsd: string
}

const BuyShareDialog: React.FC<BuyShareDialogProps> = ({
  sharesTokenId,
  sharePriceUsd,
}) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const { toast } = useToast()

  const onSubmit = async (data: any) => {
    const { shareAmount } = data
    const value = parseEther((shareAmount * +sharePriceUsd).toString())

    setIsLoading(true)
    try {
      await buyInitialShare(sharesTokenId, shareAmount, value)
      toast({
        title: "Success",
        description: "Share purchased successfully!",
      })

      reset()
      setOpen(false)
    } catch (error) {
      console.error("Error buying share:", error)
      toast({
        title: "Error",
        description: "Error buying share. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full">
        Buy
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy Share</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col gap-5">
                  <label
                    htmlFor="shareAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Share Amount
                  </label>
                  <Input
                    type="number"
                    id="shareAmount"
                    {...register("shareAmount", { required: true, min: 1 })}
                  />
                </div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BuyShareDialog
