import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { buyWorkToken } from "@/utils/user-contract-interactions"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

interface BuyWorkTokenDialogProps {
  workTokenId: number
  workTitle: string
}

const BuyWorkButton: React.FC<BuyWorkTokenDialogProps> = ({
  workTokenId,
  workTitle,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit } = useForm()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await buyWorkToken(workTokenId)
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
