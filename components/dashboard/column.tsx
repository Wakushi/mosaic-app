import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Artwork } from "@/types/artwork"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CreateWorkShare from "./createWorkShare"
import CreateSharesButton from "./createShare-button"
import TransferTokenButton from "@/components/dashboard/TransferButton"

export const columns: ColumnDef<Artwork>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <div className="font-sans">{row.original.price} USD</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const getFormattedStatus = (status: string) => {
        switch (status) {
          case "submitted":
            return "Submitted"
          case "pending certificate extraction":
            return "Pending certificate extraction"
          case "certificate extracted":
          case "pending verification":
            return "Pending verification"
          case "work verified":
          case "pending tokenization":
            return "Pending tokenization"
          case "tokenized":
            return "Tokenized"
          case "sent cross-chain":
            return "Sent cross-chain"
          default:
            return "Unknown"
        }
      }
      return <div>{getFormattedStatus(row.original.status)}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const artwork = row.original
      const [modalOpen, setModalOpen] = useState(false)
      const toggleModal = () => setModalOpen(!modalOpen)
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {artwork.status === "tokenized" && (
                <>
                  {!artwork.tokenizationRequest?.sharesTokenId && (
                    <DropdownMenuItem asChild>
                      <CreateSharesButton artwork={artwork} />
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <TransferTokenButton artwork={artwork} />
                  </DropdownMenuItem>
                </>
              )}
              {artwork.status !== "tokenized" && (
                <DropdownMenuItem asChild>
                  <span>No actions available</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateWorkShare modalOpen={modalOpen} toggleModal={toggleModal} />
        </>
      )
    },
  },
]
