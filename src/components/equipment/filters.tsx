"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const itemTypes = ["Boots", "Vest", "Helmet"]
const statuses = ["Returned", "Pending", "Overdue"]

export function Filters({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: (v: any) => void;
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by employee name or item ID"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <div className="flex gap-4 items-center">
        <Label>Item Type:</Label>
        <Select
          value={filters.itemType || "all"}
          onValueChange={(value) =>
            setFilters({ ...filters, itemType: value === "all" ? "" : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Item Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {itemTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {filters.dateRange?.from ? (
                <>
                  {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                  {filters.dateRange.to ? format(filters.dateRange.to, "LLL dd, y") : "..."}
                </>
              ) : (
                "Pick date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <Calendar
              mode="range"
              selected={filters.dateRange}
              onSelect={(range) => setFilters({ ...filters, dateRange: range })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-4 items-center">
        <Label>Status:</Label>
        {statuses.map((status) => (
          <div key={status} className="flex items-center gap-2">
            <Checkbox
              checked={filters.status.includes(status)}
              onCheckedChange={(checked) => {
                setFilters({
                  ...filters,
                  status: checked
                    ? [...filters.status, status]
                    : filters.status.filter((s: string) => s !== status),
                })
              }}
            />
            <Label>{status}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}
