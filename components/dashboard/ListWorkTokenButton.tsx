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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { listWorkToken } from "@/utils/user-contract-interactions"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface ListWorkTokenButtonProps {
  artwork: Artwork
}

const schema = z.object({
  listPriceUsd: z
    .string()
    .min(1, "Price must be at least $0.01"),
})

const ListWorkTokenButton = forwardRef<HTMLDivElement, ListWorkTokenButtonProps>(
  ({ artwork }, ref) => {
    const { toast } = useToast()
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    })
	console.log(artwork);
	

    const onSubmit = async (data: any) => {
      const workTokenId = artwork.tokenizationRequest?.workTokenId

      if (workTokenId === undefined) {
        toast({
          title: "Error",
          description: "Work token ID not found. Please try again later.",
        })
        return
      }

      try {
        await listWorkToken(workTokenId, data.listPriceUsd)
        toast({
          title: "Success",
          description: "Work token listed successfully!",
        })
      } catch (error) {
        console.error("Failed to list work token:", error)
        toast({
          title: "Error",
          description: "Failed to list work token. Please try again.",
        })
      }
    }

    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <div ref={ref} className="p-1 text-sm cursor-pointer">List Work Token</div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>List Work Token</DialogTitle>
              <DialogDescription>
                Enter the price in USD to list the work token.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <label htmlFor="listPriceUsd" className="block text-sm font-medium text-gray-700">
                  List Price (USD)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  id="listPriceUsd"
                  {...register("listPriceUsd")}
                />
                {errors.listPriceUsd && (
                  <span className="text-red-500 text-sm">
                    {errors.listPriceUsd.message?.toString()}
                  </span>
                )}
              </div>
              <DialogFooter className="p-4">
                <Button type="submit">List</Button>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </>
    )
  }
)

ListWorkTokenButton.displayName = "ListWorkTokenButton"

export default ListWorkTokenButton
