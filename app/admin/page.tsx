"use client"

import { useEffect, useState } from "react"
import { Artwork } from "@/types/artwork"
import { DataTable } from "@/components/adminDashboard/data-table"
import { getColumns } from "@/components/adminDashboard/column"
import Loader from "@/components/Loader"

export default function Admin() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArtworks = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/artwork")
      if (!response.ok) {
        throw new Error("Failed to fetch artworks")
      }
      const data = await response.json()
      setArtworks(data)
    } catch (err) {
      console.error("Error fetching artworks:", err)
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArtworks()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className=" min-h-screen px-14 pt-[8rem]">
      <h1 className="text-4xl self-start">Admin</h1>
      <div className="mx-auto py-10">
        <DataTable columns={getColumns(fetchArtworks)} data={artworks} />
      </div>
    </div>
  )
}
