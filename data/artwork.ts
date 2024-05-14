export type Artwork = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  artwork: string;
};

export const data: Artwork[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    artwork: "Suzie",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    artwork: "Francesca",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    artwork: "Francesca",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    artwork: "Francesca",
  },
  // ...
];
