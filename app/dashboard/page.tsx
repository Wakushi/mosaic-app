"use client"

import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import { columns } from "@/components/dashboard/column"
import { DataTable } from "@/components/dashboard/data-table"
import { Artwork } from "@/types/artwork"
import Loader from "@/components/clientUi/Loader"

const fetchArtworks = async (clientAddress: string): Promise<Artwork[]> => {
  const response = await fetch(`/api/artwork?clientAddress=${clientAddress}`)
  if (!response.ok) {
    throw new Error("Failed to fetch artworks")
  }
  return response.json()
}

export default function Dashboard() {
  const { address: clientAddress } = useAccount()

  const { data, error, isLoading } = useQuery<Artwork[], Error>({
    queryKey: ["artworks", clientAddress],
    queryFn: () => fetchArtworks(clientAddress!),
    enabled: !!clientAddress,
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

  if (!data) {
    return <div>No data</div>
  }

  return (
    <div className="min-h-screen px-14 pt-[8rem]">
      <h1 className="text-4xl self-start">Dashboard</h1>
      <p className="opacity-80">Find all your tokenization requests</p>
      <div className="mx-auto py-10">
        <DataTable
          columns={columns}
          data={data}
          clientAddress={clientAddress}
        />
      </div>
    </div>
  )
}
