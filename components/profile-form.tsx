"use client"
import { ReusableForm } from "./clientUi/form"
import { z } from "zod"
import { useAccount } from "wagmi"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

const fieldsData = [
  {
    name: "username",
    label: "Gallery / Company Name",
    description: "Enter the name of your gallery or company.",
  },
  {
    name: "email",
    label: "Email",
    description: "Provide an email address for contact purposes.",
  },
]

type FormValues = z.infer<typeof formSchema>

export function ProfileForm({ toggleModal }: { toggleModal: () => void }) {
  const account = useAccount()
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: FormValues) => {
    if (account?.address) {
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            address: account.address,
          }),
        })
        const responseData = await response.json()
        toast({
          title: "Registration Success",
          description: responseData.message,
        })
        router.push("/dashboard")
      } catch (error) {
        toast({
          title: "Registration Error",
          description: "Failed to register",
        })
      } finally {
        toggleModal()
      }
    } else {
      toast({
        title: "Connection Error",
        description: "Wallet not connected",
      })
    }
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Are you a gallery or an art owner?</h3>
      <p className="mb-4">
        Register now to access your dashboard and submit your first artwork
        tokenization request.
      </p>
      <ReusableForm
        schema={formSchema}
        defaultValues={{ username: "", email: "" }}
        onSubmit={onSubmit}
        fields={fieldsData}
      />
    </div>
  )
}
