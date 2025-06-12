import { mockEquipmentHistory } from "@/data/equipment"
import { EquipmentHistory } from "@/types/equipment"
import { useEffect, useState } from "react"

export const useFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    itemType: "",
    status: [] as string[],
    dateRange: { from: undefined, to: undefined } as any,
  })

  const [filteredData, setFilteredData] = useState<EquipmentHistory[]>([])

  useEffect(() => {
    const filtered = mockEquipmentHistory.filter((row) => {
      const matchesSearch =
        row.employeeName.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.itemId.toLowerCase().includes(filters.search.toLowerCase())

      const matchesItem = filters.itemType ? row.itemType === filters.itemType : true

      const matchesStatus =
        filters.status.length > 0 ? filters.status.includes(row.status) : true

      const matchesDate =
        filters.dateRange?.from && filters.dateRange?.to
          ? row.date >= filters.dateRange.from && row.date <= filters.dateRange.to
          : true

      return matchesSearch && matchesItem && matchesStatus && matchesDate
    })

    setFilteredData(filtered)
  }, [filters])

  return {
    filters,
    setFilters,
    filteredData,
  }
}