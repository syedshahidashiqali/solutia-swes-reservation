"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { EquipmentHistory } from "@/types/equipment"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const renderSpinner = (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"></div>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="rounded-md border hidden md:block">
        {/* <div className="overflow-x-auto max-h-[300px]"> */}
        <div className="overflow-auto max-h-[300px]">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-10">
                    {renderSpinner}
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Card view for mobile */}
      <div className="block md:hidden space-y-4">
        {loading ? (
          renderSpinner
        ) : table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => {
            const equipment = row.original as EquipmentHistory
            return (
              <div className="border rounded p-4 shadow-sm" key={equipment.id}>
                <div><strong>Employee:</strong> {equipment.employeeName}</div>
                <div><strong>Item:</strong> {equipment.itemName} ({equipment.itemId})</div>
                <div><strong>Type:</strong> {equipment.itemType}</div>
                <div><strong>Status:</strong> {equipment.status}</div>
                <div><strong>Date:</strong> {equipment.date.toDateString()}</div>
                <div><strong>Return Date:</strong> {equipment.returnDate?.toDateString() || "N/A"}</div>
              </div>
            )
          })
        ) : (
          <div className="text-center text-sm text-muted-foreground">No results.</div>
        )}
      </div>
      <div>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
