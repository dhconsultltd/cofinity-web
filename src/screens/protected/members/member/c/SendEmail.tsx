// src/components/member/SendEmail.tsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, Send, Paperclip, Smile, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { MEMBERS_API } from "@/constants";

const templates = [
  {
    name: "Welcome Message",
    subject: "Welcome to the Cooperative!",
    body: "Dear {name},\n\nWelcome to our cooperative family! We're excited to have you...",
  },
  {
    name: "Savings Reminder",
    subject: "Monthly Savings Reminder",
    body: "Hi {name},\n\nThis is a friendly reminder to complete your monthly savings of ₦{target}...",
  },
  {
    name: "Loan Approval",
    subject: "Your Loan Has Been Approved!",
    body: "Congratulations {name}!\n\nYour loan of ₦{amount} has been approved and disbursed...",
  },
];

export default function SendEmail({ member }: { member: any }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = useMutation({
    mutationFn: () =>
      apiClient.post(MEMBERS_API.SENDEMAIL(member.id), { subject, message }),
    onSuccess: () => {
      toast.success("Email sent successfully!");
      setSubject("");
      setMessage("");
    },
    onError: () => toast.error("Failed to send email"),
  });

  const applyTemplate = (template: (typeof templates)[0]) => {
    setSubject(template.subject.replace("{name}", member.first_name));
    setMessage(
      template.body
        .replace("{name}", member.first_name)
        .replace(
          "{target}",
          Number(member.monthly_savings_target || 0).toLocaleString()
        )
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
            Send Email
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Communicate directly with {member.first_name}
          </p>
        </div>

        <Badge className="text-sm sm:text-base py-2 px-3 flex items-center gap-2 whitespace-nowrap">
          <User className="w-4 h-4" />
          {member.email || "No email"}
        </Badge>
      </div>

      <Card className="p-4 sm:p-6 md:p-8 bg-gray-50 border-gray-100 shadow-sm">
        <div className="space-y-6">
          {/* To */}
          <div>
            <label className="label">To</label>
            <Input
              value={member.email || "No email address"}
              disabled
              className="mt-2"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="label">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject..."
              className="mt-2 text-base sm:text-lg"
            />
          </div>

          {/* Templates */}
          <div>
            <p className="text-sm font-semibold mb-3 text-neutral-700">
              Quick Templates
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {templates.map((t) => (
                <Button
                  key={t.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyTemplate(t)}
                  className="hover:bg-blue-50 text-sm"
                >
                  {t.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="label">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows={10}
              className="mt-2 text-sm sm:text-base leading-relaxed"
            />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 text-sm text-neutral-500 gap-3">
              <div className="flex gap-3 flex-wrap">
                <Button variant="ghost" size="sm" disabled>
                  <Paperclip className="w-4 h-4 mr-1" /> Attach
                </Button>
                <Button variant="ghost" size="sm" disabled>
                  <Smile className="w-4 h-4 mr-1" /> Emoji
                </Button>
              </div>
              <span className="text-xs sm:text-sm">
                {message.length} characters
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Save as Draft
            </Button>
            <Button
              size="sm"
              className="bg-black hover:bg-gray-800 text-white shadow-md w-full sm:w-auto"
              onClick={() => sendEmail.mutate()}
              disabled={!subject || !message || sendEmail.isPending}
            >
              {sendEmail.isPending ? (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 animate-spin" /> Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Email
                </span>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Reusable small label styling
const label = "text-sm font-semibold text-neutral-700 flex items-center gap-2";
