import { addDays } from "date-fns";

export const unavailableDates: Date[] = [
  addDays(new Date(), 1),
  addDays(new Date(), 3),
  addDays(new Date(), 6),
  addDays(new Date(), 10),
];
