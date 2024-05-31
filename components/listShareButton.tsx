import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Loader from "@/components/clientUi/Loader"
import { useToast } from "@/components/ui/use-toast"
import { listMarketShareItem } from "@/utils/user-contract-interactions"
import { useQueryClient } from "@tanstack/react-query"

interface ListShareDialogProps {
  sharesTokenId: number
  open: boolean
  setOpen: (open: boolean) => void
}

const schema = z.object({
  shareAmount: z
    .number()
    .min(1, { message: "You must list at least one share." }),
  priceUsd: z.number().min(0.01, { message: "Price must be at least $0.01." }),
})

const ListShareDialog: React.FC<ListShareDialogProps> = ({
  sharesTokenId,
  open,
  setOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const onSubmit = async (data: any) => {
    const { shareAmount, priceUsd } = data

    setIsLoading(true)
    try {
      await listMarketShareItem(sharesTokenId, shareAmount, priceUsd)
      toast({
        title: "Success",
        description: "Shares listed successfully!",
      })
      queryClient.invalidateQueries({ queryKey: ["listedShares", "shares"] })
      reset()
      setOpen(false)
    } catch (error) {
      console.error("Error listing shares:", error)
      toast({
        title: "Error",
        description: "Failed to list shares. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List Shares for Sale</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Input
                  {...register("shareAmount", { valueAsNumber: true })}
                  placeholder="Share Amount"
                  type="number"
                />
                {errors.shareAmount &&
                  typeof errors.shareAmount.message === "string" && (
                    <p className="text-red-500 text-xs">
                      {errors.shareAmount.message}
                    </p>
                  )}
              </div>
              <div>
                <Input
                  {...register("priceUsd", { valueAsNumber: true })}
                  placeholder="Total Price (USD)"
                  type="number"
                />
                {errors.priceUsd &&
                  typeof errors.priceUsd.message === "string" && (
                    <p className="text-red-500 text-xs">
                      {errors.priceUsd.message}
                    </p>
                  )}
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ListShareDialog
