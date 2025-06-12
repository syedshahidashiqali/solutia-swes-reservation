"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { isSameDay } from "date-fns";
import { unavailableDates } from "@/data/availability";

export function CalendarCard() {
  const router = useRouter();

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    if (unavailableDates.some((d) => isSameDay(d, date))) return;
    router.push(`/reservation/create?date=${date.toISOString()}`);
  };

  return (
    <Card className="p-6 w-fit">
      <h2 className="text-xl font-semibold mb-4">Available Reservation Dates</h2>
      <Calendar
        mode="single"
        onSelect={handleDateSelect}
        modifiers={{ unavailable: unavailableDates }}
        modifiersClassNames={{ unavailable: "bg-red-100 text-red-500 line-through" }}
      />
      <div className="flex gap-4 mt-4">
        <span className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 bg-red-200 rounded-full" />
          Unavailable
        </span>
        <span className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 bg-primary rounded-full" />
          Available
        </span>
      </div>
      <p className="text-sm mt-2 text-muted-foreground">Click an available date to create a reservation.</p>
    </Card>
  )
}