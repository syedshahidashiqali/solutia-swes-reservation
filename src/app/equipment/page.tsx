"use client"

import { Filters } from "@/components/equipment/filters"
import { DataTable } from "@/components/equipment/table/data-table"
import { columns } from "@/components/equipment/table/data-table-columns"
import { useFilters } from "@/hooks/useFilters"

export default function EquipmentPage() {
  const { filters, setFilters, filteredData } = useFilters()
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Equipment Overview & History</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <DataTable columns={columns} data={filteredData} />
    </div>
  )
}
