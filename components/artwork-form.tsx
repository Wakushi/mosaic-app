import { z } from "zod";
import React, { useState } from "react";
import { ReusableForm } from "./clientUi/form";
import { useAccount } from "wagmi";
import { pinJSONToIPFS, pinFileToIPFS } from "@/utils/pinata-data";
import { ArtworkData } from "@/types/artwork";
import { Button } from "./ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";

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

interface ArtFormProps {
  onArtworkAdded: () => void;
}

export function ArtForm({ onArtworkAdded }: ArtFormProps) {
  const account = useAccount();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (values: ArtFormValues) => {
    setLoading(true);
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
          const certificateResponse = await fetch("/api/generateCertificate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: values.title,
              artist: values.artist,
            }),
          });

          const certificateData = await certificateResponse.json();

          if (!certificateResponse.ok) {
            throw new Error(
              certificateData.error || "Failed to generate certificate"
            );
          }

          const certificateBuffer = Buffer.from(
            certificateData.certificateBuffer,
            "base64"
          );
          const pinataCertificateResponse = await pinFileToIPFS(
            certificateBuffer,
            `certificate-${values.title}`
          );

          if (pinataCertificateResponse.IpfsHash) {
            const hashDataResponse = await fetch("/api/artwork/addHashData", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                clientAddress: account?.address || "",
                title: values.title,
                hashReport: reportResponse.IpfsHash,
                hashArtwork: pinataResponse.IpfsHash,
                hashCertificate: pinataCertificateResponse.IpfsHash,
              }),
            });

            if (!hashDataResponse.ok) {
              throw new Error("Failed to add hash data to Firebase");
            }

            setSuccessMessage(
              "Artwork added successfully! Expert report and certificate generated and stored."
            );
            toast({
              title: "Success",
              description:
                "Artwork added successfully! Expert report and certificate generated and stored.",
            });

            onArtworkAdded(); 
          } else {
            throw new Error("Failed to pin certificate to IPFS");
          }
        } else {
          throw new Error("Failed to pin expert report to IPFS");
        }
      } else {
        throw new Error("Failed to pin JSON to IPFS");
      }

      const response = await fetch("/api/artwork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artworkData),
      });
      const responseData = await response.json();
      if (response.ok) {
        setSuccessMessage("Artwork added successfully!");
        toast({
          title: "Success",
          description: "Artwork added successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add artwork: " + responseData.error,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: "Failed to add artwork: " + error.message,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add artwork: Unknown error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : successMessage ? (
        <div className="flex flex-col justify-center items-center p-10">
          <h2 className="py-10">{successMessage}</h2>
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
