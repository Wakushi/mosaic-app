export type Artwork = {
  id: string;
  clientAddress: string;
  status: "pending" | "processing" | "verification pending" | "approved" | "rejected";
  createdAt: number;
  approvedAt?: number;
  title: string;
  artist: string;
  owner: string;
  price: number;
  tokenizationRequestId?: string;
};

export type ArtworkData = {
  clientAddress: string | undefined;
  title: string;
  artist: string;
  owner: string;
  price: number;
};