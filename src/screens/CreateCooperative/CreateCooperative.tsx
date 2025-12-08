import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { nigeriaStatesAndLgas } from "@/data/nigeria";
import { z } from "zod";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Upload,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building2,
  MapPin,
  Landmark,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { TENANT_API } from "@/constants";

// Form Schema
const formSchema = z.object({
  name: z.string().min(3, "Cooperative name is required"),
  initials: z.string().max(10, "Initials too long").optional(),
  registration_number: z.string().min(3, "Registration number required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required"),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().min(20, "Tell us about your cooperative").max(500),
  industry_type: z.string().min(1, "Select industry"),
  business_type: z.string().min(1, "Select business type"),
  founded_at: z
    .date()
    .refine((date) => date !== null, "Founding date required"),
  address: z.string().min(10, "Full address required"),
  city: z.string().min(2),
  state: z.string().min(2),
  lga: z.string().min(2, "LGA required"),
  country: z.string().min(2),
  bank_name: z.string().min(2, "Bank name required"),
  account_name: z.string().min(3),
  account_number: z.string().min(10).max(12),
  logo: z.any().optional(),
  cac_document: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  {
    number: 1,
    title: "Basic Info",
    icon: Building2,
    description: "Organization details",
  },
  {
    number: 2,
    title: "Location",
    icon: MapPin,
    description: "Address information",
  },
  {
    number: 3,
    title: "Banking",
    icon: Landmark,
    description: "Bank & documents",
  },
];

export default function CreateCooperative() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [cacPreview, setCacPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      initials: "",
      registration_number: "",
      email: "",
      phone: "",
      website: "",
      description: "",
      industry_type: "",
      business_type: "",
      address: "",
      city: "",
      state: "",
      lga: "",
      country: "Nigeria",
      bank_name: "",
      account_name: "",
      account_number: "",
    },
  });

  const progress = (currentStep / steps.length) * 100;
  const CurrentStepIcon = steps[currentStep - 1].icon;

  const handleFile = (field: "logo" | "cac_document", file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === "logo") {
        setLogoPreview(reader.result as string);
        form.setValue("logo", file);
      } else {
        setCacPreview(reader.result as string);
        form.setValue("cac_document", file);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString().split("T")[0]);
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    try {
      setIsLoading(true);
      const response = await apiClient.post(TENANT_API.CREATE_TENANT, formData);

      if (response.success) {
        localStorage.setItem("selected_cooperative_id", response.data.id);
        toast.success("Cooperative created successfully!", {
          description: "Redirecting to plan selection...",
        });
        navigate("/choose-plan", { state: { tenant: response.data } });
        return;
      }

      toast.error("Failed to create cooperative", {
        description: response.message || "Please try again.",
      });
    } catch (error: any) {
      toast.error("Error Creating Cooperative", {
        description:
          error.message || "Failed to save cooperative. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = {
      1: [
        "name",
        "initials",
        "registration_number",
        "email",
        "phone",
        "description",
        "industry_type",
        "business_type",
        "founded_at",
      ],
      2: ["address", "city", "state", "lga", "country", "website"],
      3: ["bank_name", "account_name", "account_number"],
    }[currentStep] as any;

    const result = await form.trigger(fieldsToValidate);
    if (result && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="bg-gray-900 rounded-full p-3">
                <CurrentStepIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Create Your Cooperative
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Set up your cooperative profile and get ready to manage members,
            funds, and transactions securely.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                Step {currentStep} of {steps.length}
              </span>
              <Badge variant="secondary" className="bg-gray-100 text-gray-900">
                {steps[currentStep - 1].title}
              </Badge>
            </div>
            <span className="text-xs text-gray-500">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-1.5 bg-gray-200" />

          {/* Step Indicators */}
          <div className="flex gap-3 pt-2">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;

              return (
                <div
                  key={step.number}
                  className={cn(
                    "flex-1 p-3 rounded-lg border transition-all duration-300 cursor-pointer",
                    isActive
                      ? "bg-gray-900 text-white border-gray-900"
                      : isCompleted
                      ? "bg-gray-100 text-gray-900 border-gray-200"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <StepIcon className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left">
                      <p
                        className={cn(
                          "text-xs font-medium",
                          isActive || isCompleted ? "font-semibold" : ""
                        )}
                      >
                        {step.title}
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          isActive || isCompleted ? "" : "text-gray-500"
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-gray-200 bg-white shadow-lg">
          <CardContent className="p-8 sm:p-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* STEP 1 - Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* Row 1: Name & Initials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              Cooperative Name{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., FutureGrow Cooperative"
                                className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="initials"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              Initials
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., FGC"
                                maxLength={10}
                                className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 2: Registration & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="registration_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              Registration Number{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="CAC Registration No."
                                className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              Email Address{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="hello@cooperative.com"
                                className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 3: Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium">
                            Phone Number <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+234 (0) XXX XXX XXXX"
                              className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Row 4: Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium">
                            Description <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your cooperative, its mission, and what you do..."
                              className="border-gray-300 text-gray-900 placeholder:text-gray-400 min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Row 5: Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="industry_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              Industry <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gray-300 text-gray-900 h-11 w-full">
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-gray-200">
                                <SelectItem value="agriculture">
                                  Agriculture
                                </SelectItem>
                                <SelectItem value="transport">
                                  Transport
                                </SelectItem>
                                <SelectItem value="traders">
                                  Traders & Artisans
                                </SelectItem>
                                <SelectItem value="housing">Housing</SelectItem>
                                <SelectItem value="multipurpose">
                                  Multi-purpose
                                </SelectItem>
                                <SelectItem value="others">Others</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="business_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              Business Type{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gray-300 text-gray-900 h-11 w-full">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-gray-200">
                                <SelectItem value="savings-credit">
                                  Savings & Credit
                                </SelectItem>
                                <SelectItem value="consumer">
                                  Consumer
                                </SelectItem>
                                <SelectItem value="producer">
                                  Producer
                                </SelectItem>
                                <SelectItem value="marketing">
                                  Marketing
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="founded_at"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              Founded Date{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "h-11 pl-3 text-left font-normal border-gray-300 text-gray-900",
                                      !field.value && "text-gray-500"
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
                              <PopoverContent
                                className="w-auto p-0 bg-white border-gray-200"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2 - Location */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* Full Address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium">
                            Street Address{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 12 Palm Avenue, Ikeja"
                              className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* City, State, LGA, Country */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              City <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Lagos"
                                className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>State *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                {Object.keys(nigeriaStatesAndLgas).map(
                                  (state) => (
                                    <SelectItem key={state} value={state}>
                                      {state}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lga"
                        render={({ field }) => {
                          const selectedState = form.watch("state");
                          return (
                            <FormItem className="w-full">
                              <FormLabel>LGA *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue
                                      placeholder={
                                        selectedState
                                          ? "Select LGA"
                                          : "Pick a State First"
                                      }
                                    />
                                  </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                  {selectedState &&
                                    nigeriaStatesAndLgas[selectedState]?.map(
                                      (lga) => (
                                        <SelectItem key={lga} value={lga}>
                                          {lga}
                                        </SelectItem>
                                      )
                                    )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 text-sm font-medium">
                              Country
                            </FormLabel>
                            <FormControl>
                              <Input
                                defaultValue="Nigeria"
                                disabled
                                className="border-gray-300 text-gray-500 h-11 bg-gray-50"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Website */}
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 text-sm font-medium">
                            Website (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://yourcooperative.coop"
                              className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* STEP 3 - Banking & Documents */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    {/* Logo Upload */}
                    <div>
                      <FormLabel className="text-gray-700 text-sm font-medium block mb-4">
                        Cooperative Logo
                      </FormLabel>
                      {logoPreview ? (
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                          <img
                            src={logoPreview}
                            alt="Logo"
                            className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 font-medium">
                              Logo uploaded successfully
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Image will be used for your cooperative profile
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setLogoPreview(null);
                              form.setValue("logo", null);
                            }}
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-900 font-medium">
                              Click to upload logo
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG or GIF (Max 5MB)
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFile("logo", e.target.files?.[0] || null)
                            }
                          />
                        </label>
                      )}
                    </div>

                    {/* Bank Details Section */}
                    <div className="space-y-6 border-t border-gray-200 pt-8">
                      <div>
                        <h3 className="text-gray-900 font-semibold text-base flex items-center gap-2">
                          <Landmark className="w-5 h-5" />
                          Bank Account Details
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Primary account for cooperative transactions
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="bank_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">
                                Bank Name{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., GTBank"
                                  className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="account_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">
                                Account Name{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Cooperative Account Name"
                                  className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="account_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 text-sm font-medium">
                                Account Number{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="0123456789"
                                  className="border-gray-300 text-gray-900 placeholder:text-gray-400 h-11"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* CAC Document */}
                    <div className="space-y-4 border-t border-gray-200 pt-8">
                      <div>
                        <h3 className="text-gray-900 font-semibold text-base flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          CAC Certificate
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Upload your Corporate Affairs Commission certificate
                        </p>
                      </div>

                      {cacPreview ? (
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
                          <div className="bg-green-100 p-3 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 font-medium">
                              Document uploaded successfully
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              CAC certificate is ready for verification
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            onClick={() => {
                              setCacPreview(null);
                              form.setValue("cac_document", null);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 text-gray-400 mb-3" />
                            <p className="text-sm text-gray-900 font-medium">
                              Click to upload CAC document
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF only (Max 10MB)
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) =>
                              handleFile(
                                "cac_document",
                                e.target.files?.[0] || null
                              )
                            }
                          />
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={cn(
                      "border-gray-300 text-gray-700 hover:bg-gray-50",
                      currentStep === 1 && "invisible"
                    )}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gray-900 text-white hover:bg-gray-800 font-semibold px-8"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gray-900 text-white hover:bg-gray-800 font-semibold px-8"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-2 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Create Cooperative
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 p-4 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@cooperative.com"
              className="text-gray-900 hover:underline font-medium"
            >
              support@cooperative.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
