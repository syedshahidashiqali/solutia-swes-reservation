import { z } from "zod"
import { isSameOrAfterToday } from "./utils";

export const reservationSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  item: z.string().min(1, "Please select an item"),
  date: z.date().refine(isSameOrAfterToday, "Date must be today or later"),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

