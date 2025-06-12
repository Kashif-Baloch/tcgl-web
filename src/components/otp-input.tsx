"use client"

import type React from "react"

import { useRef, useState, useEffect, type KeyboardEvent, type ClipboardEvent } from "react"
import { Input } from "@/components/ui/input"

interface OTPInputProps {
    length?: number
    value: string
    onChange: (value: string) => void
}

export function OTPInput({ length = 6, value = "", onChange }: OTPInputProps) {
    const [otp, setOtp] = useState<string[]>(
        value.split("").slice(0, length).concat(Array(length).fill("")).slice(0, length),
    )
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        // Update internal state if external value changes
        if (value) {
            const newOtp = value.split("").slice(0, length).concat(Array(length).fill("")).slice(0, length)
            setOtp(newOtp)
        }
    }, [value, length])

    const focusInput = (index: number) => {
        if (index >= 0 && index < length) {
            inputRefs.current[index]?.focus()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value

        // Only accept digits
        if (!/^\d*$/.test(value)) return

        // Take only the last character if multiple are pasted/entered
        const digit = value.slice(-1)

        // Update the OTP array
        const newOtp = [...otp]
        newOtp[index] = digit
        setOtp(newOtp)

        // Notify parent component
        onChange(newOtp.join(""))

        // Auto-focus next input if we have a value
        if (digit) {
            focusInput(index + 1)
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (!otp[index]) {
                // If current input is empty, focus previous input
                focusInput(index - 1)
            } else {
                // Clear current input but stay on it
                const newOtp = [...otp]
                newOtp[index] = ""
                setOtp(newOtp)
                onChange(newOtp.join(""))
            }
        } else if (e.key === "ArrowLeft") {
            focusInput(index - 1)
        } else if (e.key === "ArrowRight") {
            focusInput(index + 1)
        }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text/plain").trim()

        // Check if pasted content is all digits
        if (!/^\d+$/.test(pastedData)) return

        // Fill the OTP inputs with the pasted digits
        const digits = pastedData.slice(0, length).split("")
        const newOtp = [...otp]

        digits.forEach((digit, idx) => {
            if (idx < length) {
                newOtp[idx] = digit
            }
        })

        setOtp(newOtp)
        onChange(newOtp.join(""))

        // Focus the next empty input or the last input
        const nextEmptyIndex = newOtp.findIndex((val) => !val)
        focusInput(nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1)
    }

    return (
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {Array.from({ length }).map((_, index) => (
                <Input
                    key={index}
                    // @ts-expect-error due to types 
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-xl font-bold"
                    aria-label={`Digit ${index + 1} of OTP`}
                />
            ))}
        </div>
    )
}
