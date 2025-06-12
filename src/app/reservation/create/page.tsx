import { ReservationForm } from "@/components/form/reservation-form";

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Reservation</h1>
      <ReservationForm />
    </main>
  );
}
