"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useFormContext } from "../lead-from";
import {
  //ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const schema = z.object({
  drivingLicenceFront: z.instanceof(File, {
    message: "Please upload the front of your driving licence",
  }),
  drivingLicenceBack: z.instanceof(File, {
    message: "Please upload the back of your driving licence",
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

export function DrivingLicenceStep({ onSubmit }: Props) {
  const { formData, updateFormData } = useFormContext();
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      drivingLicenceFront: formData.drivingLicenceFront || undefined,
      drivingLicenceBack: formData.drivingLicenceBack || undefined,
    },
  });

  const frontFile = watch("drivingLicenceFront");
  const backFile = watch("drivingLicenceBack");

  const handleFileChange = (file: File | null, side: "front" | "back") => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (side === "front") {
        setFrontPreview(result);
        setValue("drivingLicenceFront", file);
      } else {
        setBackPreview(result);
        setValue("drivingLicenceBack", file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitData = (data: FormData) => {
    updateFormData(data);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="space-y-6">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-ubuntu font-semibold">
            Upload Driving Licence
          </h3>
          <p className="text-muted-foreground font-ubuntu">
            Please upload both sides of your driving licence
          </p>
        </div>

        {/* Front Side */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="front" className="font-ubuntu text-sm sm:text-base">
              Upload the <strong>front side</strong> of your driving licence
            </Label>
            <Input
              id="front"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleFileChange(file, "front");
              }}
              className="py-2.5 h-[50px] !px-5"
            />
            {errors.drivingLicenceFront && (
              <p className="text-sm text-red-600">
                {errors.drivingLicenceFront.message}
              </p>
            )}
          </div>

          {frontPreview && (
            <Card>
              <CardContent className="px-4">
                <p className="font-ubuntu text-sm sm:text-base font-medium mb-2">
                  Front Side Preview:
                </p>
                <Image
                  height={900}
                  width={900}
                  src={frontPreview || "/placeholder.svg"}
                  alt="Driving licence front"
                  className="max-w-full h-32 object-contain border rounded"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Back Side */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="back" className="font-ubuntu text-sm sm:text-base">
              Now upload the <strong>back side</strong> of your driving licence
            </Label>
            <Input
              id="back"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleFileChange(file, "back");
              }}
              className="py-2.5 h-[50px] !px-5"
            />
            {errors.drivingLicenceBack && (
              <p className="text-sm text-red-600">
                {errors.drivingLicenceBack.message}
              </p>
            )}
          </div>

          {backPreview && (
            <Card>
              <CardContent className="px-4">
                <p className="font-ubuntu text-sm sm:text-base font-medium mb-2">
                  Back Side Preview:
                </p>
                <Image
                  height={900}
                  width={900}
                  src={backPreview || "/placeholder.svg"}
                  alt="Driving licence back"
                  className="max-w-full h-32 object-contain border rounded"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Both Images Preview */}
        {frontPreview && backPreview && (
          <Card>
            <CardContent className="px-4">
              <p className="text-base sm:text-lg font-ubuntu font-medium mb-4">
                Both Sides Uploaded:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-ubuntu text-sm sm:text-base text-muted-foreground mb-1">
                    Front
                  </p>
                  <Image
                    height={900}
                    width={900}
                    src={frontPreview || "/placeholder.svg"}
                    alt="Driving licence front"
                    className="w-full h-[150px] object-contain border rounded py-2"
                  />
                </div>
                <div>
                  <p className="font-ubuntu text-sm sm:text-base text-muted-foreground mb-1">
                    Back
                  </p>
                  <Image
                    height={900}
                    width={900}
                    src={backPreview || "/placeholder.svg"}
                    alt="Driving licence back"
                    className="w-full h-[150px] object-contain border rounded py-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex items-center w-full relative gap-2">
        {/* <Button
          type="button"
          className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px]  text-white  rounded-md  from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={onBack}
        >
          <ChevronLeft strokeWidth={3} className="size-5" />
          Back
        </Button> */}
        <Button
          type="submit"
          disabled={!frontFile || !backFile}
          className="relative bg-gradient-to-r w-full flex-1 cursor-pointer h-[50px]  text-white  rounded-md  from-[#d73470] to-primary hover:from-[#1F8585] hover:to-[#d73470] !text-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Verify & Submit
          <ChevronRight strokeWidth={3} className="size-5" />
        </Button>
      </div>
    </form>
  );
}
