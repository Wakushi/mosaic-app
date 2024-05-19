// Shadcn
import { ReusableForm } from "./clientUi/form";

// Zod
import { z } from "zod";

// Wagmi
import { useAccount } from 'wagmi'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

const fieldsData = [
  {
    name: "username",
    label: "Username",
    description: "This is your public display name.",
  },
  { name: "email", label: "Email", description: "This is your email address." },
];

type FormValues = z.infer<typeof formSchema>;

export function ProfileForm() {

  const account = useAccount()
  const onSubmit = async (values: FormValues) => {
    if (account?.address) {
      const response = await fetch('/api/user/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          address: account.address
        })
      });
      const responseData = await response.json();
      alert(responseData.message);
    } else {
      alert('User is not connected');
    }
  };


  return (
    <ReusableForm
      schema={formSchema}
      defaultValues={{ username: "", email: "" }}
      onSubmit={onSubmit}
      fields={fieldsData}
    />
  );
}
