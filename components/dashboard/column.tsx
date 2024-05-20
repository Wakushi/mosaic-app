"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Artwork } from "@/types/artwork";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateWorkShare from "../createWorkShare";

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
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const artwork = row.original;
      const [modalOpen, setModalOpen] = useState(false);
      const toggleModal = () => setModalOpen(!modalOpen);
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
              <DropdownMenuItem>View</DropdownMenuItem>
              {artwork.status === "approved" && (
                <DropdownMenuItem>
                  <div onClick={toggleModal}>Create share</div>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateWorkShare modalOpen={modalOpen} toggleModal={toggleModal} />
        </>
      );
    },
  },
];
