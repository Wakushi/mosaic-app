"use client"

import { useQuery } from "@tanstack/react-query"
import { Artwork } from "@/types/artwork"
import { DataTable } from "@/components/adminDashboard/data-table"
import { getColumns } from "@/components/adminDashboard/column"
import Loader from "@/components/clientUi/Loader"

const fetchArtworks = async (): Promise<Artwork[]> => {
  const response = await fetch("/api/artwork")
  if (!response.ok) {
    throw new Error("Failed to fetch artworks")
  }
  return response.json()
}

export default function Admin() {
  const {
    data: artworks,
    error,
    isLoading,
    refetch,
  } = useQuery<Artwork[], Error>({
    queryKey: ["artworks"],
    queryFn: fetchArtworks,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="min-h-screen px-14 pt-[8rem]">
      <h1 className="text-4xl self-start">Admin</h1>
      <div className="mx-auto py-10">
        <DataTable columns={getColumns(refetch)} data={artworks || []} />
      </div>
    </div>
  )
}
