"use client";
import { OTPInput } from "@/components/otp-input";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormContext } from "../lead-from";
import { toast } from "sonner";

const schema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d{4}$/, "OTP must contain only numbers"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export function OTPVerificationStep({ onNext }: Props) {
  const { formData, updateFormData } = useFormContext();

  const {
    // register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: formData.otp || "",
    },
  });

  const handleOTPSubmit = async (data: FormData) => {
    updateFormData(data);
    const otpRes = await fetch("/apis/twillio/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: formData.mobileNumber,
        otpCode: data.otp,
      }),
    });

    const otpData = await otpRes.json();
    if (otpData.success) {
      toast.success("OTP verified successfully!");
      onNext();
    }
    else {
      toast.error("Failed to verify OTP");
    }
  };


  const sendOtpAgain = async () => {
    const otpRes = await fetch("/apis/twillio/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: formData.mobileNumber,
      }),
    });

    const otpData = await otpRes.json();
    if (otpData.success) {
      toast.success("OTP sent successfully!");
    }
    else {
      toast.error("Failed to send OTP");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOTPSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-ubuntu font-semibold">
            OTP Verification
          </h3>
          <p className="text-muted-foreground font-ubuntu">
            Enter the 4-digit OTP sent to your phone: {formData.mobileNumber}
          </p>
        </div>

        {/* <Card className="bg-[#d73470]/10 border-[#d73470]/50">
          <CardContent className="px-4 !py-0">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-4 w-4" />
              <p className="text-sm">
                For demo purposes, use OTP: <strong>123456</strong>
              </p>
            </div>
          </CardContent>
        </Card> */}

        <div className="space-y-2 flex flex-col items-center justify-center gap-3">
          <Label htmlFor="otp" className="!text-base font-ubuntu">
            4-Digit OTP
          </Label>
          <OTPInput
            value={watch("otp") || ""}
            onChange={(value) => setValue("otp", value)}
          />
          {errors.otp && (
            <p className="text-sm text-red-600">{errors.otp.message}</p>
          )}
        </div>

        <div className="text-center">
          <Button onClick={sendOtpAgain} type="button" variant="link" className="text-sm cursor-pointer">
            Didn&apos;t receive the code? Resend OTP
          </Button>
        </div>
      </div>

      <div className="flex items-center w-full relative gap-2">
        {/* <Button type="button" className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px] from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] text-white  rounded-md   !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={onBack}>
                    <ChevronLeft strokeWidth={3} className="size-5" />
                    Back
                </Button> */}
        <Button
          type="submit"
          disabled={watch("otp").length < 4}
          className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px] from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] text-white  rounded-md   !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </form>
  );
}
