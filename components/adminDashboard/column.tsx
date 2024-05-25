import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Artwork } from "@/types/artwork"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import RequestWorkVerificationButton from "@/components/adminDashboard/requestWorkVerification-button"
import OpenTokenizationRequestButton from "@/components/adminDashboard/OpenTokenizationRequestButton"

export function getColumns(refreshData: () => void): ColumnDef<Artwork>[] {
  return [
    {
      accessorKey: "owner",
      header: "Owner",
    },
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
              return "Certificate extracted"
            case "pending verification":
              return "Pending verification"
            case "work verified":
              return "Work verified"
            case "tokenized":
              return "Tokenized"
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

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {artwork.status === "submitted" && (
                <DropdownMenuItem asChild>
                  <OpenTokenizationRequestButton
                    artwork={artwork}
                    refreshData={refreshData}
                  />
                </DropdownMenuItem>
              )}
              {(artwork.status === "certificate extracted" ||
                artwork.status === "tokenized") && (
                <DropdownMenuItem asChild>
                  <RequestWorkVerificationButton
                    artwork={artwork}
                    refreshData={refreshData}
                  />
                </DropdownMenuItem>
              )}
              {(artwork.status === "pending certificate extraction" ||
                artwork.status === "pending verification") && (
                <DropdownMenuItem disabled>
                  No actions available
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
