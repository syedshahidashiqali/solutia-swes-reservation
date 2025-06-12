"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { ReservationFormValues, reservationSchema } from "@/lib/validation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function ReservationForm() {
  const [loading, setLoading] = useState(false);

  // Use Next.js useSearchParams to get the date from the URL
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const prefillDate = dateParam ? new Date(dateParam) : undefined;

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      employeeId: "",
      item: "",
      date: prefillDate ?? new Date(),
    },
  });

  async function onSubmit(data: ReservationFormValues) {
    setLoading(true);
    console.log("Form submitted with data:", data);

    try {
      // Call REST API POST /api/reservations
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create reservation");
      }

      toast.success(`Reservation created for Employee ID: ${data.employeeId}`);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-4">
        {/* Employee ID */}
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter Employee ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Item Dropdown */}
        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <FormControl >
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boots">Boots</SelectItem>
                    <SelectItem value="vest">Vest</SelectItem>
                    <SelectItem value="helmet">Helmet</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Reservation Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="w-full">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full font-normal ",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} // disable past dates
                    initialFocus
                    className="w-full rounded border border-gray-300 p-2"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>Submit Reservation</Button>
      </form>
    </Form>
  );
}
