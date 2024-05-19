"use client";

import { useEffect, useState } from "react";
import { Artwork } from "@/types/artwork";
import { DataTable } from "@/components/adminDashboard/data-table";
import { columns } from "@/components/adminDashboard/column";

export default function Admin() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/artwork")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch artworks");
        }
        return response.json();
      })
      .then((data) => setArtworks(data))
      .catch((error) => {
        console.error("Error fetching artworks:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-white to-gray-300 min-h-screen py-20 pl-14">
      <h1 className="text-8xl">Admin</h1>
      <div className="container mx-auto py-20">
        <DataTable columns={columns} data={artworks} />
      </div>
    </div>
  );
}