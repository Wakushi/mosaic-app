"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { columns } from "../../components/dashboard/column";
import { DataTable } from "../../components/dashboard/data-table";
import { Artwork } from "@/types/artwork";

export default function Dashboard() {
  const { address: clientAddress } = useAccount();
  const [data, setData] = useState<Artwork[]>([]);
  useEffect(() => {
    if (clientAddress) {
      fetch(`/api/getArtworksByClientAdress?clientAddress=${clientAddress}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching artworks:", error));
    }
  }, [clientAddress]);

  return (
    <div className="bg-gradient-to-r from-white to-gray-300 min-h-screen">
      <div className="container mx-auto py-20">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
