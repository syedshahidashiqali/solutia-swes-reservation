import { ReservationForm } from "@/components/form/reservation-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Reservation</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationForm />
      </Suspense>
    </main>
  );
}
