"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "../lead-from";
import {
  //ChevronLeft,
  ChevronRight,
} from "lucide-react";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .refine(
      (value) => {
        // UK mobile number validation
        // Remove all spaces for validation
        const cleanValue = value.replace(/\s+/g, "");
        // Accepts formats like: 07123456789, +447123456789
        return /^(\+447\d{9}|07\d{9})$/.test(cleanValue);
      },
      {
        message:
          "Please enter a valid UK mobile number (e.g. 07123456789 or +447123456789)",
      }
    ),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function PersonalDetailsStep({ onNext }: Props) {
  const { formData, updateFormData } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      dateOfBirth: formData.dateOfBirth || "",
      email: formData.email || "",
      mobileNumber: formData.mobileNumber || "",
    },
  });

  const onSubmit = (data: FormData) => {
    updateFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="font-ubuntu text-base">
            First Name
          </Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstName")}
            className="!h-[50px] !text-base font-ubuntu"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="font-ubuntu text-base">
            Last Name
          </Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            {...register("lastName")}
            className="!h-[50px] font-ubuntu !text-base"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="font-ubuntu text-base">
          Date of Birth
        </Label>
        <Input
          id="dateOfBirth"
          placeholder="DD/MM/YYYY"
          {...register("dateOfBirth")}
          className="!h-[50px] font-ubuntu !text-base"
        />
        {errors.dateOfBirth && (
          <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="font-ubuntu text-base">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="!h-[50px] font-ubuntu !text-base"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobileNumber" className="font-ubuntu text-base">
          Mobile Number
        </Label>
        <Input
          id="mobileNumber"
          placeholder="e.g. 07123456789"
          {...register("mobileNumber")}
          className="!h-[50px] font-ubuntu !text-base"
        />
        {errors.mobileNumber && (
          <p className="text-sm text-red-600">{errors.mobileNumber.message}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Valid formats: 07123456789, 07123 456789, +447123456789
        </p>
      </div>

      <div className="flex items-center w-full relative gap-2">
        {/* <Button
          type="button"
          className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px] from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] text-white  rounded-md  !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={onBack}
        >
          <ChevronLeft strokeWidth={3} className="size-5" />
          Back
        </Button> */}
        <Button
          type="submit"
          className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px] text-white  rounded-md  from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight strokeWidth={3} className="size-5" />
        </Button>
      </div>
    </form>
  );
}
