"use client"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { columns } from "@/components/dashboard/column"
import { DataTable } from "@/components/dashboard/data-table"
import { Artwork } from "@/types/artwork"
import Loader from "@/components/Loader"

export default function Dashboard() {
  const { address: clientAddress } = useAccount()
  const [data, setData] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (clientAddress) {
      fetch(`/api/artwork?clientAddress=${clientAddress}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch artworks")
          }
          return response.json()
        })
        .then((data) => setData(data))
        .catch((error) => {
          console.error("Error fetching artworks:", error)
          setError(error.message)
        })
        .finally(() => setLoading(false))
    }
  }, [clientAddress])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-300">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className=" min-h-screen px-14 pt-[8rem]">
      <h1 className="text-4xl self-start">Dashboard</h1>
      <div className="mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
