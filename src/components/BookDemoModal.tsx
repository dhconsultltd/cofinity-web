// src/components/modals/BookDemoModal.tsx
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar, Clock, Users, Building2, Send } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { fetchCsrfToken } from "@/lib/sanctum";

// Validation Schema
const formSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  cooperative_name: z
    .string()
    .min(2, { message: "Cooperative name is required" }),
  member_count_range: z
    .string()
    .min(1, { message: "Please select approximate number of members" }),
  preferred_date: z
    .string()
    .min(1, { message: "Please select a preferred date" }),
  preferred_time: z
    .string()
    .min(1, { message: "Please select a preferred time" }),
  additional_info: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Available time slots (you can make this dynamic later)
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

interface BookDemoModalProps {
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Book Demo Modal - Reusable component for requesting a product demo
 * Can be triggered from header, pricing page, footer, etc.
 */
export function BookDemoModal({
  trigger,
  defaultOpen = false,
  className,
}: BookDemoModalProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      cooperative_name: "",
      member_count_range: "",
      preferred_date: "",
      preferred_time: "",
      additional_info: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      // Simulate API call to your backend
      //send a crsf cookie first ?
      await fetchCsrfToken();

      const res = await apiClient.post("/api/demo-requests", values);

      if (!res.success) {
        toast.error("Failed to send demo request", {
          description: res.message || "Please try again later.",
        });
        throw new Error(res.message || "Failed to submit demo request");
      }

      toast.success("Demo request sent!", {
        description:
          "We'll contact you shortly to confirm your preferred time.",
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or contact support directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className={`gap-2   ${className}`}>
            <Calendar className="h-4 w-4 " />
            Book a Demo
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book a Live Demo</DialogTitle>
          <DialogDescription>
            See how our cooperative management platform can work for your
            organization
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ese Oke" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@cooperative.org"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+234 80X XXX XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cooperative_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cooperative Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Lagos Traders Cooperative"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="member_count_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approximate Number of Members</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-50">1–50 members</SelectItem>
                      <SelectItem value="51-200">51–200 members</SelectItem>
                      <SelectItem value="201-500">201–500 members</SelectItem>
                      <SelectItem value="501-2000">
                        501–2,000 members
                      </SelectItem>
                      <SelectItem value="2000+">
                        More than 2,000 members
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="preferred_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferred_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time (WAT)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additional_info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your cooperative, specific features you're interested in, or any questions..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto gap-2 bg-gray-900 hover:bg-gray-800"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Request Demo
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>

        <div className="text-xs text-center text-gray-500 mt-6">
          <p>
            We respect your privacy. Your information will only be used to
            schedule your demo.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
