"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { EquipmentHistory } from "@/types/equipment"
import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<EquipmentHistory>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => row.original.date.toDateString(),
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
  },
  {
    accessorKey: "itemId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item ID" />
    ),
    cell: ({ row }) => `${row.original.itemName} (${row.original.itemId})`,
  },
  {
    accessorKey: "itemType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      const variant =
        status === "Returned"
          ? "default"
          : status === "Pending"
          ? "secondary"
          : "destructive"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "returnDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Return Date"  />
    ),
    
    cell: ({ row }) => row.original.returnDate?.toDateString() || "N/A",
  },
]
