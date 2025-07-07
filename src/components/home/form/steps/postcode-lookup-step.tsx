"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "../lead-from"
import { ChevronRight } from "lucide-react"

const schema = z.object({
    postcode: z
        .string()
        .min(1, "Postcode is required")
        .regex(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i, "Invalid UK postcode format"),
    selectedAddress: z.string().min(1, "Please select an address"),
})

type FormData = z.infer<typeof schema>

// Dummy addresses for demonstration
// const DUMMY_ADDRESSES = [
//     "123 High Street, London, SW1A 1AA",
//     "456 Oak Avenue, London, SW1A 1AA",
//     "789 Park Road, London, SW1A 1AA",
//     "321 Church Lane, London, SW1A 1AA",
//     "654 Mill Street, London, SW1A 1AA",
// ]

interface Props {
    onNext: () => void
}

export function PostcodeLookupStep({ onNext }: Props) {
    const { formData, updateFormData } = useFormContext()
    const [addresses, setAddresses] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            postcode: formData.postcode || "",
            selectedAddress: formData.selectedAddress || "",
        },
    })

    const postcode = watch("postcode")
    const selectedAddress = watch("selectedAddress")

    const handleFindAddress = async () => {
        if (!postcode) return

        setIsLoading(true)
        await handleLookup()
        setIsLoading(false)
    }

    const onSubmit = (data: FormData) => {
        updateFormData(data)
        onNext()
    }

    const handleLookup = async () => {
        const response = await fetch(`/apis/lookup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postcode }),
        })
        const data = await response.json()
        if (response.ok) {
            const adData = data?.map((item: any) => {
                const lines = item?.Address?.Lines || [];
                const filteredLines = lines.filter((line: string) => line !== "");
                const fString = filteredLines.join(" ")
                return fString
            });
            setAddresses(adData)
        }
        else {
            alert("Failed to fetch addresses")
            return
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="postcode"
                        className="block text-[18px] sm:text-[20px] font-bold text-primary mb-2 text-left"
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            lineHeight: "150%",
                            letterSpacing: "0%"
                        }}
                    >
                        Enter Your Postcode to Begin
                    </Label>
                    <div className="flex gap-2">
                        <Input id="postcode" placeholder="e.g. SW1A 1AA" {...register("postcode")}
                            className="flex-1 !text-[17px] sm:!text-lg px-4 h-[50px]"
                        />
                        <Button type="button" onClick={handleFindAddress} disabled={!postcode || isLoading} variant="outline" className="h-[50px] bg-primary text-white hover:text-white cursor-pointer rounded-md hover:bg-[#d73470] transition duration-200 !px-5 text-[18px] flex items-center justify-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                className="text-white cursor-pointer"
                            >
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                                    fill="currentColor"
                                />
                            </svg>
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </div>
                    {errors.postcode && <p className="text-sm text-red-600">{errors.postcode.message}</p>}
                </div>

                {addresses.length > 0 && (
                    <div className="space-y-2">
                        <Label htmlFor="address"
                            className="block text-[18px] sm:text-[20px] font-bold text-primary mb-2 text-left"
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                                lineHeight: "150%",
                                letterSpacing: "0%"
                            }}
                        >Select Address</Label>
                        <Select value={selectedAddress} onValueChange={(value) => setValue("selectedAddress", value)} >
                            <SelectTrigger className="w-full !h-[50px] !text-base cursor-pointer px-4">
                                <SelectValue placeholder="Choose your address" />
                            </SelectTrigger>
                            <SelectContent>
                                {addresses.map((address, index) => (
                                    <SelectItem key={index} value={address}>
                                        {address}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.selectedAddress && <p className="text-sm text-red-600">{errors.selectedAddress.message}</p>}
                    </div>
                )}
            </div>

            <div className="flex justify-end w-full">
                <Button type="submit" className="relative bg-gradient-to-r cursor-pointer h-[50px]  text-white p-2.5 sm:p-4 rounded-md w-full from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!selectedAddress}>
                    Start My Claim <ChevronRight strokeWidth={3} className="size-5" />
                </Button>
            </div>
        </form>
    )
}
