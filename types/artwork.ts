export type Artwork = {
  id: string;
  clientAddress: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
  approvedAt?: number;
  title: string;
  artist: string;
  owner: string;
  price: number;
};

export type ArtworkData = {
  clientAddress: string | undefined;
  title: string;
  artist: string;
  owner: string;
  price: number;
};