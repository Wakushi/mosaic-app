import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Artwork } from "@/types/artwork";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DeployWorkButton from "@/components/adminDashboard/deployWork-button";
import RequestCertificateExtractionButton from "@/components/adminDashboard/requestCertificateExtraction-button";
import RequestWorkVerificationButton from "@/components/adminDashboard/requestWorkVerification-button";

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
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const artwork = row.original;

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
              <DropdownMenuItem>
                <DeployWorkButton artwork={artwork} refreshData={refreshData} />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RequestCertificateExtractionButton artwork={artwork} refreshData={refreshData} />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RequestWorkVerificationButton artwork={artwork} refreshData={refreshData} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}