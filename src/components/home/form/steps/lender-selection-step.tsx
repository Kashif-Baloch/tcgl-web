"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useFormContext } from "../lead-from"
import { ChevronLeft, ChevronRight } from "lucide-react"

const schema = z.object({
    selectedLenders: z.array(z.string()).min(1, "Please select at least one lender"),
})

type FormData = z.infer<typeof schema>

const LENDERS = [
    "Barclays",
    "HSBC",
    "Santander",
    "Lloyds Bank",
    "NatWest",
    "TSB",
    "Halifax",
    "Nationwide",
    "First Direct",
    "Metro Bank",
]

interface Props {
    onNext: () => void
    onBack: () => void
}

export function LenderSelectionStep({ onNext, onBack }: Props) {
    const { formData, updateFormData } = useFormContext()

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            selectedLenders: formData.selectedLenders || [],
        },
    })

    const selectedLenders = watch("selectedLenders")

    const onSubmit = (data: FormData) => {
        updateFormData(data)
        onNext()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="text-center">
                    <h3 className="text-xl font-ubuntu font-semibold">Select Your Lender</h3>
                    <p className="text-muted-foreground font-ubuntu">Choose your preferred lender from the list below</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lender" className="font-ubuntu text-base">Lenders</Label>
                    <div className="border rounded-md p-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedLenders.map((lender) => (
                                <div
                                    key={lender}
                                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                >
                                    {lender}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newLenders = selectedLenders.filter((l) => l !== lender)
                                            setValue("selectedLenders", newLenders)
                                        }}
                                        className="text-primary hover:text-primary/80 focus:outline-none"
                                        aria-label={`Remove ${lender}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-x"
                                        >
                                            <path d="M18 6 6 18"></path>
                                            <path d="m6 6 12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {LENDERS.map((lender) => (
                                <div key={lender} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`lender-${lender}`}
                                        checked={selectedLenders.includes(lender)}
                                        onChange={(e) => {
                                            const newLenders = e.target.checked
                                                ? [...selectedLenders, lender]
                                                : selectedLenders.filter((l) => l !== lender)
                                            setValue("selectedLenders", newLenders)
                                        }}
                                        className="mr-2 h-5 w-5"
                                    />
                                    <label htmlFor={`lender-${lender}`} className="text-sm font-ubuntu">
                                        {lender}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {errors.selectedLenders && <p className="text-sm text-red-600">{errors.selectedLenders.message}</p>}
                </div>
            </div>
            <div className="flex items-center w-full relative gap-2">
                <Button type="button" className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px] from-[#239696] to-[#33CCCC] text-white  rounded-md  hover:from-[#1F8585] hover:to-[#2BBBBB] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={onBack}>
                    <ChevronLeft strokeWidth={3} className="size-5" />
                    Back
                </Button>
                <Button type="submit" disabled={selectedLenders.length === 0} className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px] from-[#239696] to-[#33CCCC] text-white  rounded-md  hover:from-[#1F8585] hover:to-[#2BBBBB] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Next
                    <ChevronRight strokeWidth={3} className="size-5" />
                </Button>
            </div>
        </form>
    )
}
