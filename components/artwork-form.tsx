import { z } from "zod";
import React from "react";
import { ReusableForm } from "./clientUi/form";
import { useAccount } from "wagmi";

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

export const artFormSchema = z.object({
  artist: z.string().min(2, "Artist name is required").max(100),
  owner: z.string().min(2, "Owner name is required").max(100),
  title: z.string().min(2, "Title is required").max(100),
  price: stringToNumber,
});

export type ArtFormValues = z.infer<typeof artFormSchema>;

export const artFieldsData = [
  { name: "artist", label: "Artist", description: "Name of the artist." },
  { name: "owner", label: "Owner", description: "Name of the current owner." },
  { name: "title", label: "Title", description: "Title of the artwork." },
  {
    name: "price",
    label: "Price",
    description: "Price of the artwork.",
    type: "number",
  },
];

export function ArtForm() {
  const account = useAccount();

  const onSubmit = async (values: ArtFormValues) => {
    try {
      const response = await fetch("/api/addArtwork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientAddress: account?.address,
          title: values.title,
          artist: values.artist,
          owner: values.owner,
          price: values.price,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert("Artwork added successfully");
      } else {
        alert("Failed to add artwork: " + responseData.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Failed to add artwork: " + error.message);
      } else {
        alert("Failed to add artwork: Unknown error");
      }
    }
  };

  return (
    <ReusableForm
      schema={artFormSchema}
      defaultValues={{ artist: "", owner: "", title: "", price: 0 }}
      onSubmit={onSubmit}
      fields={artFieldsData}
    />
  );
}
