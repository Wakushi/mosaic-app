import React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { buyMarketShareItem } from "@/utils/user-contract-interactions"

interface BuyMarketShareDialogProps {
  marketShareItemId: number
}

const BuyMarketShareDialog: React.FC<BuyMarketShareDialogProps> = ({
  marketShareItemId,
}) => {
  const { toast } = useToast()

  const fetchMarketShareDetail = async (id: number): Promise<any> => {
    const response = await fetch(`/api/listed-shares/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch share details")
    }
    return response.json()
  }

  const onBuy = async () => {
    try {
      const marketShareItem = await fetchMarketShareDetail(marketShareItemId)
      console.log("Market share item:", marketShareItem)
      if (!marketShareItem) {
        throw new Error("Market share item not found")
      }
      await buyMarketShareItem(marketShareItemId, marketShareItem.priceUsd)
      toast({
        title: "Success",
        description: "Market share item purchased successfully!",
      })
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
        Buy Market Share Item
      </Button>
    </>
  )
}

export default BuyMarketShareDialog
