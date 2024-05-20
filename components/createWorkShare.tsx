import { Modal } from "./clientUi/modal";
import { ReusableForm } from "./clientUi/form";
import { string, z } from "zod";
import { useState } from "react";

interface CreateWorkShareProps {
  modalOpen: boolean;
  toggleModal: () => void;
}


const stringToNumber = z
  .union([
    z
      .string()
      .regex(/^\d+(\.\d+)?$/)
      .transform(Number),
    z.number(),
  ])
  .refine((value) => typeof value === "number", {
    message: "Must be a valid number",
  });

const formSchema = z.object({
  contractAddress: z.string().min(42, "Invalid contract address").max(42, "Invalid contract address"),
  totalShares: stringToNumber,
});

const fieldsData = [
  {
    name: "contractAddress",
    label: "Contract Address",
    description: "Enter the NFT contract address.",
  },
  {
    name: "totalShares",
    label: "Total Shares",
    description: "Enter the total number of shares.",
    type: "number",
  },
];

type FormValues = z.infer<typeof formSchema>;

export default function CreateWorkShare({
  modalOpen,
  toggleModal,
}: CreateWorkShareProps) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const response = await fetch('/api/createWorkShares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create work shares');
      }
      alert(responseData.message);
      toggleModal(); 
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={modalOpen} close={toggleModal}>
      <h1>Create Work Share</h1>
      <ReusableForm
        schema={formSchema}
        defaultValues={{ contractAddress: "", totalShares: 1 }}
        onSubmit={onSubmit}
        fields={fieldsData}
      />
    </Modal>
  );
}
