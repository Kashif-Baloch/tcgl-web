"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormContext } from "../lead-from";
import {
  //ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const schema = z.object({
  signature: z.string().min(1, "Please provide your signature"),
  termsAgreed: z.boolean({ message: "You must agree to the terms" }),
  // termsAgreed: z.literal(true, {
  //   errorMap: () => ({ message: "You must agree to the terms" }),
  // }),
  claimsAgreed: z.boolean().optional(),
  authoriseAgreed: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function SignatureStep({ onNext }: Props) {
  const { formData, updateFormData } = useFormContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      signature: formData.signature || "",
      termsAgreed: formData.termsAgreed || false,
      claimsAgreed: formData?.claimsAgreed || false,
      authoriseAgreed: formData?.authoriseAgreed || false,
    },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set drawing styles
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Load existing signature if available
    if (formData.signature) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setHasSignature(true);
      };
      img.src = formData.signature;
    }
  }, [formData.signature]);

  // Get coordinates from mouse or touch event
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX: number, clientY: number;

    if ("touches" in e) {
      // Touch event
      const touch = e.touches[0] || e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Mouse events
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL();
    setValue("signature", signatureData);
  };

  // Touch events
  const startTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const touchDraw = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent scrolling
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL();
    setValue("signature", signatureData);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setValue("signature", "");
  };


  const onSubmit = async (data: FormData) => {
    updateFormData(data);
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
      alert("OTP sent successfully!");
      onNext();
    }
    else {
      alert("Failed to send OTP");
    }

  };


  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Store the current drawing
      const currentDrawing = canvas.toDataURL();

      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Restore drawing styles
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Restore the drawing
      if (currentDrawing && currentDrawing !== "data:,") {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = currentDrawing;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-ubuntu font-semibold">
            Digital Signature
          </h3>
          <p className="text-muted-foreground font-ubuntu">
            Please sign in the box below using your mouse or touch
          </p>
        </div>

        <div className="space-y-2">
          <Label className="font-ubuntu text-base">Signature</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              className="w-full h-[200px] border border-gray-200 rounded cursor-crosshair bg-white"
              style={{ touchAction: "none" }}
              // Mouse events
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              // Touch events
              onTouchStart={startTouchDrawing}
              onTouchMove={touchDraw}
              onTouchEnd={stopTouchDrawing}
              onTouchCancel={stopTouchDrawing}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-[40px] cursor-pointer"
              onClick={clearSignature}
            >
              Clear Signature
              <X />
            </Button>
          </div>
          {errors.signature && (
            <p className="text-sm text-red-600">{errors.signature.message}</p>
          )}
        </div>
      </div>
      <p className="text-xs text-center">
        Please carefully read the &quot;Car Finance Terms of Engagement
        Bundle&quot; and Client Statements below before you submit your
        signature.
      </p>
      <div className="grid grid-flow-col gap-2">
        <input
          type="checkbox"
          id="authorise"
          {...register("claimsAgreed")}
          className="mt-1 h-5 w-5 cursor-pointer"
        />
        <label
          htmlFor={`authorise`}
          className="text-sm pt-1 cursor-pointer font-ubuntu select-none"
        >
          I was not fully informed about the commission the lenders, and grouped
          lenders selected paid to the dealerships. I authorise The Claims Guys
          Legal to make claims about all car finance agreements I held.
        </label>
      </div>{" "}
      <div className="grid grid-flow-col gap-2">
        <input
          type="checkbox"
          id="claims"
          {...register("authoriseAgreed")}
          className="mt-1 h-5 w-5 cursor-pointer"
        />
        <label
          htmlFor={`claims`}
          className="text-sm pt-1 cursor-pointer font-ubuntu select-none"
        >
          I authorise The Claims Guy Legal to: make an information request to my
          lenders for information about car finance details, and any add-on
          products. I agree for this information to be released to The Claims
          Guys Legal; and refer my claim to the Financial Ombudsman Service
          (FOS), where there is merit; and receive payment of any compensation
          due.
        </label>
      </div>
      <div className="grid grid-flow-col gap-2">
        <input
          type="checkbox"
          id="termsAgreed"
          {...register("termsAgreed")}
          className="mt-1 h-5 w-5 cursor-pointer"
        />
        <label
          htmlFor={`termsAgreed`}
          className="text-sm pt-1 cursor-pointer font-ubuntu select-none"
        >
          I have read the Car Finance Terms of Engagement Claims Bundle, and the
          Client Statements above and agree to be bound by them. I agree for my
          signature to be applied to a Letter of Authority and FOS Complaint
          Declaration for each lender
        </label>
      </div>
      <div className="pl-5">
        {errors.termsAgreed && (
          <p className="text-sm text-red-600">{errors.termsAgreed.message}</p>
        )}
      </div>
      <div className="flex items-center w-full relative gap-2">
        {/* <Button type="button" className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px]  text-white  rounded-md  from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={onBack}>
                    <ChevronLeft strokeWidth={3} className="size-5" />
                    Back
                </Button> */}
        <Button
          type="submit"
          disabled={!hasSignature}
          className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px]  text-white  rounded-md  from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight strokeWidth={3} className="size-5" />
        </Button>
      </div>
      <p className="text-xs text-center">
        When you click submit we will receive the personal information you have
        provided and will start processing your claim
      </p>
    </form>
  );
}
