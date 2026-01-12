// src/pages/Contact.tsx
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { fetchCsrfToken } from "@/lib/sanctum";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";

// You can create this component separately later
// const BookDemoModal = () => { ... };

export default function Contact() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await fetchCsrfToken();
      const res = await apiClient.post("/api/contact", form);
      //

      if (!res?.success) {
        toast.error("Failed to send message. Please try again later.", {
          description: res?.message,
        });
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ full_name: "", email: "", subject: "", message: "" });

      // Reset success message after 6 seconds
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      toast.error("An error occurred. Please try again later.", {
        description: error.message,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero / Header Section */}
        {/* <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Contact Us
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                We're here to help. Reach out to us and we'll get back to you as
                soon as possible.
              </p>
            </div>
          </div>
        </section> */}

        <section className="border-b bg-black border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">
              Contact Us
            </h1>
            <p className="mt-4 text-gray-300  text-center">
              We're here to help. Reach out to us and we'll get back to you as
              soon as possible.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left - Contact Information */}

            <div className="lg:col-span-7">
              <Card className="border-gray-200 shadow-sm h-full">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Send us a message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and our team will respond promptly.
                  </p>

                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <Send className="h-10 w-10 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Message Sent Successfully
                      </h3>
                      <p className="text-gray-600">
                        Thank you! We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="full_name"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            placeholder="Ese Oke"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="micheal@user.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Brief topic of your message"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="How can we assist you today?"
                          rows={6}
                          required
                          className="resize-none"
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto bg-black hover:bg-gray-800 text-white px-8 py-6 text-base"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>

                        <p className="mt-4 text-xs text-gray-500 text-center md:text-left">
                          By submitting this form you agree to our{" "}
                          <a
                            onClick={() => navigate("/privacy-policy")}
                            className="text-gray-700 underline hover:text-gray-900"
                          >
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-8">
                <Card className="border-gray-200 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Get in Touch
                    </h2>

                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-100">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Email
                          </p>
                          <a
                            href="mailto:support@cofinity.ng"
                            className="text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            support@cofinity.ng
                          </a>
                          <p className="text-sm text-gray-500 mt-1">
                            We reply within 24 hours
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-100">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Phone
                          </p>
                          <a
                            href="tel:+234902 249 6696"
                            className="text-gray-900 hover:text-green-600 transition-colors"
                          >
                            +234 902 249 6696
                          </a>
                          <p className="text-sm text-gray-500 mt-1">
                            Monday–Friday, 9:00 AM – 5:00 PM
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black flex items-center justify-center text-gray-100">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Office
                          </p>
                          <p className="text-gray-900">Warri, Nigeria</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Visit by appointment only
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right - Contact Form */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
