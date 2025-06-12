"use client"

import { ReservationForm } from "@/components/form/reservation-form";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const prefillDate = dateParam ? new Date(dateParam) : undefined;
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Reservation</h1>
      <ReservationForm prefillDate={prefillDate} />
    </main>
  );
}
