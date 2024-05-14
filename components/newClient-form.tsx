import { ReusableForm } from "./clientUi/form";
import { z } from "zod";

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
  const onSubmit = (values: FormValues) => console.log(values);

  return (
    <ReusableForm
      schema={formSchema}
      defaultValues={{ username: "", email: "" }}
      onSubmit={onSubmit}
      fields={fieldsData}
    />
  );
}
