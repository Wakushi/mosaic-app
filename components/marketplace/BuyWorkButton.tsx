import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import {
  buyWorkToken,
  getUsdcValueOfUsd,
} from "@/utils/user-contract-interactions"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"

interface BuyWorkTokenDialogProps {
  workTokenId: number
  workTitle: string
  workPrice: number
}

const BuyWorkButton: React.FC<BuyWorkTokenDialogProps> = ({
  workTokenId,
  workTitle,
  workPrice,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit } = useForm()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const account = useAccount()

  const onSubmit = async () => {
    if (!account.address) return
    setIsLoading(true)
    try {
      const usdcValueOfUsd = await getUsdcValueOfUsd(workPrice)
      console.log("usdcValueOfUsd", usdcValueOfUsd)
      await buyWorkToken(usdcValueOfUsd, workTokenId)

      toast({
        title: "Success",
        description: "Work token purchased successfully!",
      })
      queryClient.invalidateQueries({ queryKey: ["listedArtworks"] })
      router.push("/marketplace")
    } catch (error) {
      console.error("Error buying work token:", error)
      toast({
        title: "Error",
        description: "Error buying work token. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button onClick={handleSubmit(onSubmit)} className="w-full">
        Buy {workTitle}
      </Button>
    </>
  )
}

export default BuyWorkButton
