// src/components/member/SendSMS.tsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { MessageCircle, Send, Clock, Hash, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { apiClient } from "@/lib/api-client";
import { MEMBERS_API } from "@/constants";

// import { useQuery } from "@tanstack/react-query";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
// import { Loader2 } from "lucide-react";

const templates = [
  "Your monthly savings of ₦{target} is due. Please fund your account.",
  "Congratulations! Your loan has been approved and disbursed.",
  "Reminder: Cooperative meeting this Saturday at 10 AM.",
  "Your account balance is ₦{balance}. Thank you for saving with us!",
];

export default function SendSMS({ member }: { member: any }) {
  const [message, setMessage] = useState("");

  const sendSMS = useMutation({
    mutationFn: () =>
      apiClient.post(MEMBERS_API.SENDSMS(member.id), { message }),
    onSuccess: () => {
      toast.success("SMS sent successfully!");
      setMessage("");
    },
    onError: () => toast.error("Failed to send SMS"),
  });

  //   const historyQuery = useQuery({
  //   queryKey: ["sms_history", member.id],
  //   queryFn: async () => {
  //     const res = await apiClient.get(MEMBERS_API.SMSHISTORY(member.id));
  //     return res.data;
  //   }
  // });
  // const history = historyQuery.data;

  const charsLeft = 160 - message.length;
  const pages = Math.ceil(message.length / 160);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3 flex-wrap">
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
            Send SMS
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-1">
            Instant message to {member.first_name}
          </p>
        </div>

        <Badge
          variant="outline"
          className="text-base flex items-center gap-2 sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap bg-black text-white border-black"
        >
          <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" />
          {member.phone}
        </Badge>
      </div>

      <Card className="p-4 sm:p-8 bg-gray-50 border-gray-100 shadow-sm">
        <div className="space-y-6">
          {/* Templates */}
          <div>
            <p className="text-sm font-semibold text-neutral-700 mb-3">
              Quick Templates
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {templates.map((t, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-3 whitespace-normal break-words"
                  onClick={() =>
                    setMessage(
                      t
                        .replace(
                          "{target}",
                          Number(
                            member.monthly_savings_target || 0
                          ).toLocaleString()
                        )
                        .replace(
                          "{balance}",
                          Number(member.total_savings || 0).toLocaleString()
                        )
                    )
                  }
                >
                  {t.split(".")[0]}...
                </Button>
              ))}
            </div>
          </div>

          {/* Message Section */}
          <div>
            <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4" />
              Message ({pages} page{pages > 1 ? "s" : ""})
            </label>

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 480))}
              placeholder="Type your SMS here..."
              rows={7}
              className="text-base leading-relaxed resize-none font-mono w-full break-words"
            />

            <div className="mt-3 flex flex-wrap justify-between items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  charsLeft < 20 ? "text-red-600" : "text-neutral-600"
                }`}
              >
                {charsLeft} characters left
              </span>

              <Progress
                value={(message.length / 160) * 100}
                className="w-28 sm:w-32 h-2"
              />
            </div>
          </div>

          {/* Send Button */}
          <div className="flex justify-end pt-6 border-t">
            <Button
              size="lg"
              className="text-white shadow-sm"
              onClick={() => sendSMS.mutate()}
              disabled={!message.trim() || sendSMS.isPending}
            >
              {sendSMS.isPending ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Send SMS
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* SMS History */}
      {/* <div className="mt-8">
  <h3 className="text-xl font-semibold mb-3">SMS History</h3>

  {historyQuery.isLoading ? (
    <div className="flex justify-center py-6">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
    </div>
  ) : history?.length === 0 ? (
    <p className="text-gray-500 text-sm italic">No messages sent yet.</p>
  ) : (
    <div className="bg-white shadow rounded-xl p-5 border">
      <ScrollArea className="max-h-72 pr-3">
        <div className="space-y-4">
          {history?.map((msg: any) => (
            <div key={msg.id} className="border-b pb-3 last:border-none">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(msg.created_at).toLocaleString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                    msg.status === "sent" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg.status}
                </span>
              </div>

              <Tooltip>
                <TooltipTrigger>
                  <p className="text-sm mt-1 line-clamp-2 text-gray-800 cursor-pointer hover:text-blue-600 transition">
                    {msg.message}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">{msg.message}</TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )}
</div> */}
    </div>
  );
}
