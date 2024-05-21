import { ReusableForm } from "@/components/clientUi/form";
import { Artwork } from "@/types/artwork";
import { z } from "zod";
import { useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";

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
  shareSupply: stringToNumber,
  sharePriceUsd: stringToNumber,
});

const fieldsData = [
  {
    name: "shareSupply",
    label: "Share Supply",
    description: "Total number of shares to create.",
    type: "number",
  },
  {
    name: "sharePriceUsd",
    label: "Share Price (USD)",
    description: "Price of each share in USD.",
    type: "number",
  },
];

type FormValues = z.infer<typeof formSchema>;

interface CreateSharesFormProps {
  artwork: Artwork;
  closeModal: () => void;
}

export function CreateSharesForm({ artwork, closeModal}: CreateSharesFormProps) {
  const { toast } = useToast();

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/artwork/createWorkShares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workTokenId: artwork.tokenizationRequestId,
          workOwner: artwork.clientAddress,
          shareSupply: values.shareSupply,
          sharePriceUsd: values.sharePriceUsd,
          artworkTitle: artwork.title,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to create shares");
      }

      toast({
        title: "Success",
        description: "Shares created successfully",
      });

      closeModal();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <ReusableForm
      schema={formSchema}
      defaultValues={{ shareSupply: 0, sharePriceUsd: 0 }}
      onSubmit={onSubmit}
      fields={fieldsData}
    />
  );
}
