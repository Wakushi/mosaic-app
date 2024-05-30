import { ReusableForm } from "./clientUi/form"
import { z } from "zod"
import { useAccount } from "wagmi"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  userType: z.enum(["Gallery", "Investor"], {
    required_error: "You need to select a user type.",
  }),
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

export function ProfileForm() {
  const account = useAccount()
  const { toast } = useToast()

  const onSubmit = async (values: FormValues) => {
    if (account?.address) {
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
        title: "Profile Update",
        description: responseData.message,
      })
    } else {
      toast({
        title: "Connection Error",
        description: "User is not connected",
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
