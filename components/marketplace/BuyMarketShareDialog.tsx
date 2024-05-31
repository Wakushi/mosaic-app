import React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { buyMarketShareItem } from "@/utils/user-contract-interactions"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

interface BuyMarketShareDialogProps {
  marketShareItemId: number
  workTitle: string
  marketSharePrice: number
}

const BuyMarketShareDialog: React.FC<BuyMarketShareDialogProps> = ({
  marketShareItemId,
  workTitle,
  marketSharePrice,
}) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const onBuy = async () => {
    try {
      await buyMarketShareItem(marketShareItemId, marketSharePrice)
      toast({
        title: "Success",
        description: "Market share item purchased successfully!",
      })
      queryClient.invalidateQueries({ queryKey: ["listedShares", "shares"] })
      router.push("/marketplace")
    } catch (error) {
      console.error("Error buying market share item:", error)
      toast({
        title: "Error",
        description: "Error buying market share item. Please try again.",
      })
    }
  }

  return (
    <>
      <Button onClick={() => onBuy()} className="w-full">
        Buy a share of '{workTitle}'
      </Button>
    </>
  )
}

export default BuyMarketShareDialog
