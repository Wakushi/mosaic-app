import { z } from "zod";
import React, { useState } from "react";
import { ReusableForm } from "./clientUi/form";
import { useAccount } from "wagmi";
import { pinJSONToIPFS } from "@/utils/pinata-data";
import { ArtworkData } from "@/types/artwork";
import { Button } from "./ui/button";
import Link from "next/link";

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (values: ArtFormValues) => {
    try {
      const artworkData: ArtworkData = {
        clientAddress: account?.address || "",
        title: values.title,
        artist: values.artist,
        owner: values.owner,
        price: values.price,
      };

      const pinataResponse = await pinJSONToIPFS(
        artworkData,
        `artwork-${values.title}`
      );

      if (pinataResponse.IpfsHash) {
        console.log("Pinned JSON to IPFS with hash:", pinataResponse.IpfsHash);

        const expertReport = {
          createdAt: Date.now(),
          artist: values.artist,
          work: values.title,
          valuationUSD: values.price,
          owner: values.owner,
        };

        const reportResponse = await pinJSONToIPFS(
          expertReport,
          `rapport-${values.title}`
        );

        if (reportResponse.IpfsHash) {
          const hashDataResponse = await fetch("/api/addHashData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clientAddress: account?.address || "",
              title: values.title,
              hashReport: reportResponse.IpfsHash,
              hashArtwork: pinataResponse.IpfsHash,
            }),
          });

          if (hashDataResponse.ok) {
            setSuccessMessage(
              "Artwork added successfully! Expert report generated and stored."
            );
          } else {
            throw new Error("Failed to add hash data to Firebase");
          }
        } else {
          throw new Error("Failed to pin expert report to IPFS");
        }
      } else {
        throw new Error("Failed to pin JSON to IPFS");
      }

      const response = await fetch("/api/addArtwork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artworkData),
      });
      const responseData = await response.json();
      if (response.ok) {
        setSuccessMessage("Artwork added successfully!");
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
    <div>
      {successMessage ? (
        <div className="flex flex-col justify-center items-center p-10">
          <p className="mb-4">{successMessage}</p>
          <Button>
            <Link
              href="https://calendly.com/camillemtd95/artwork-authentication-consultation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule an Appointment for Authentication
            </Link>
          </Button>
        </div>
      ) : (
        <ReusableForm
          schema={artFormSchema}
          defaultValues={{ artist: "", owner: "", title: "", price: 0 }}
          onSubmit={onSubmit}
          fields={artFieldsData}
        />
      )}
    </div>
  );
}
