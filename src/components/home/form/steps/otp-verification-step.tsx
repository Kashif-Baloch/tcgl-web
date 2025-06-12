"use client"
import { OTPInput } from "@/components/otp-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, ChevronLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useFormContext } from "../lead-from"

const schema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
})

type FormData = z.infer<typeof schema>

interface Props {
    onBack: () => void
    onSubmit: () => void
}

export function OTPVerificationStep({ onBack, onSubmit }: Props) {
    const { formData, updateFormData } = useFormContext()

    const {
        // register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            otp: formData.otp || "",
        },
    })

    const handleOTPSubmit = (data: FormData) => {
        // Validate OTP (hardcoded as "123456" for demo)
        if (data.otp !== "123456") {
            setError("otp", { message: "Invalid OTP. Please try again." })
            return
        }

        updateFormData(data)
        onSubmit()
    }

    return (
        <form onSubmit={handleSubmit(handleOTPSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="text-center">
                    <h3 className="text-xl font-ubuntu font-semibold">OTP Verification</h3>
                    <p className="text-muted-foreground font-ubuntu">Enter the 6-digit OTP sent to your phone: {formData.mobileNumber}</p>
                </div>

                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="px-4 !py-0">
                        <div className="flex items-center gap-2 text-blue-700">
                            <CheckCircle className="h-4 w-4" />
                            <p className="text-sm">
                                For demo purposes, use OTP: <strong>123456</strong>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-2 flex flex-col items-center justify-center gap-3">
                    <Label htmlFor="otp" className="!text-base font-ubuntu">6-Digit OTP</Label>
                    <OTPInput value={watch("otp") || ""} onChange={(value) => setValue("otp", value)} />
                    {errors.otp && <p className="text-sm text-red-600">{errors.otp.message}</p>}
                </div>

                <div className="text-center">
                    <Button type="button" variant="link" className="text-sm">
                        Didn&apos;t receive the code? Resend OTP
                    </Button>
                </div>
            </div>

            <div className="flex items-center w-full relative gap-2">
                <Button type="button" className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px] from-[#239696] to-[#33CCCC] text-white  rounded-md  hover:from-[#1F8585] hover:to-[#2BBBBB] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={onBack}>
                    <ChevronLeft strokeWidth={3} className="size-5" />
                    Back
                </Button>
                <Button type="submit" disabled={watch("otp").length < 6} className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px] from-[#239696] to-[#33CCCC] text-white  rounded-md  hover:from-[#1F8585] hover:to-[#2BBBBB] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Verify & Submit
                </Button>
            </div>
        </form>
    )
}
