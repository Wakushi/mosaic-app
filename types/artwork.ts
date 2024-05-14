export type Artwork = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	artwork: string;
  };