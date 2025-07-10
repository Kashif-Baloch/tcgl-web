"use client";

import { createContext, useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PostcodeLookupStep } from "./steps/postcode-lookup-step";
import { PersonalDetailsStep } from "./steps/personal-details-step";
import { LenderSelectionStep } from "./steps/lender-selection-step";
import { SignatureStep } from "./steps/signature-step";
import { DrivingLicenceStep } from "./steps/driving-licence-step";
import { OTPVerificationStep } from "./steps/otp-verification-step";
import { ChevronLeft } from "lucide-react";
import { SubmittedSuccessfully } from "./steps/submitted-successfully";

// Form data types
export interface FormData {
  postcode: string;
  selectedAddress: string;
  prefix: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  termsAgreed: boolean;
  claimsAgreed: boolean;
  authoriseAgreed: boolean;
  mobileNumber: string;
  selectedLenders: string[];
  signature: string;
  drivingLicenceFront: File | null;
  drivingLicenceBack: File | null;
  otp: string;
}

// Form context
interface FormContextType {
  formData: Partial<FormData>;
  updateFormData: (data: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
};

const TOTAL_STEPS = 7;

interface MultiStepFormProps {
  initialStep?: number;
  initialFormData?: Partial<FormData>;
  onStepChange?: (step: number) => void;
  onFormDataUpdate?: (data: Partial<FormData>) => void;
}

export default function MultiStepForm({
  initialStep = 1,
  initialFormData = {},
  onStepChange,
  onFormDataUpdate
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState<Partial<FormData>>(initialFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onFormDataUpdate?.(data);
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      onStepChange?.(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      onStepChange?.(currentStep - 1);
    }
  };

  const handleFinalSubmit = async () => {
    // console.log("Final form data:", formData);
    const res = await fetch("/apis/insurance/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);

    if (data.success) {
      alert("Form submitted successfully!");
      setCurrentStep(currentStep + 1);
    }
    else {
      alert("Form submission failed!");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PostcodeLookupStep onNext={nextStep} />;
      case 2:
        return <PersonalDetailsStep onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <OTPVerificationStep onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <LenderSelectionStep onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <SignatureStep onNext={nextStep} onBack={prevStep} />;
      case 6:
        return (
          <DrivingLicenceStep onBack={prevStep} onSubmit={handleFinalSubmit} />
        );
      case 7:
        return (
          <SubmittedSuccessfully />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = [
      "Address Lookup",
      "Personal Details",
      "OTP Verification",
      "Lender Selection",
      "Signature",
      "Driving Licence",
      "Submission",
    ];
    return titles[currentStep - 1];
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        totalSteps: TOTAL_STEPS,
      }}
    >
      <div className="bg-gray-100 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mx-auto md:px-4 md:py-6">
          <div className="bg-[white] w-full md:rounded-[16px] flex flex-col gap-4   box-border py-6 md:py-12 px-4 md:px-14">
            <div className="w-full">
              <Card className="!p-0 border-none shadow-none">
                {currentStep > 1 && (
                  <CardHeader className="!p-0">
                    <div className="space-y-4 relative">
                      <button
                        className="sm:absolute  top-2 left-0 cursor-pointer flex items-center gap-2"
                        onClick={prevStep}
                      >
                        <ChevronLeft strokeWidth={3} className="size-5" /> Back
                      </button>
                      <div className="text-center">
                        <CardTitle className="font-ubuntu font-bold text-3xl">
                          Application Form
                        </CardTitle>
                        <p className="text-muted-foreground">
                          Step {currentStep} of {TOTAL_STEPS}: {getStepTitle()}
                        </p>
                      </div>
                      <Progress
                        value={(currentStep / TOTAL_STEPS) * 100}
                        className="w-full "
                      />
                    </div>
                  </CardHeader>
                )}
                {currentStep === 1 && (
                  // Previous Code
                  //   <CardHeader className="!p-0">
                  //     <div>
                  //       <h1 className="font-ubuntu text-primary font-bold text-3xl md:text-4xl">
                  //         Your Car Finance
                  //       </h1>
                  //       <p className="text-base md:text-xl mt-2">
                  //         Car finance was mis-sold{" "}
                  //         <span className="underline decoration-[#d73470] decoration-[4px] decor">
                  //           between 2007 and 2020.
                  //         </span>{" "}
                  //       </p>
                  //       <p className="text-base md:text-xl mt-2">
                  //         Select ALL lenders below you want to check for potential
                  //         claims.
                  //       </p>
                  //       <h2 className="font-ubuntu mt-3 text-primary font-bold text-2xl md:text-3xl">
                  //         Can&apos;t remember...
                  //       </h2>
                  //       <h3 className="font-ubuntu mt-2 text-primary font-bold text-[19px] md:text-[22px]">
                  //         All your lenders?
                  //       </h3>
                  //       <p className="text-base md:text-xl mt-2">
                  //         Don&apos;t worry just select any other lenders you think
                  //         you may have had car finance with and we will check.
                  //       </p>
                  //     </div>
                  //   </CardHeader>
                  <CardHeader className="!p-0">
                    <div>
                      <h1 className="font-ubuntu text-primary font-bold text-3xl md:text-4xl">
                        Have you had a vehicle on finance between 2007-2024?
                      </h1>
                      <h3 className="font-ubuntu mt-2 text-primary font-bold text-[19px] md:text-[22px]">
                        You could be owed £ 2,860*
                      </h3>
                      <p className="text-base md:text-xl mt-2">
                        {/* You could be owed £ 2,860* */}
                        {/* <span className="underline decoration-[#d73470] decoration-[4px] decor">
                          between 2007 and 2020.
                        </span>{" "} */}
                      </p>
                      <p className="text-base md:text-xl mt-2">
                        Join 330,000+ people and use the agreement finder to
                        start your claim in just 60 seconds
                      </p>
                      {/* <h2 className="font-ubuntu mt-3 text-primary font-bold text-2xl md:text-3xl">
                        Can&apos;t remember...
                      </h2> */}
                      <h3 className="font-ubuntu mt-2 text-primary font-bold text-[19px] md:text-[22px]">
                        Up to 99% of car finance agreements were mis sold.
                      </h3>
                      <p className="text-base md:text-xl mt-2">
                        check if you were charged secret commissions with our
                        free* online agreement check
                      </p>
                    </div>
                  </CardHeader>
                )}
                <CardContent className={`${currentStep === 1 ? "" : ""} !p-0`}>
                  {renderStep()}
                </CardContent>
              </Card>
            </div>
            <div
              className="mt-4 flex flex-col items-center justify-center gap-2"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 10,
                lineHeight: "150%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#373643",
              }}
            >
              <div className="flex items-center">
                <svg
                  className="mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  style={{ color: "#373643" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: 10,
                    lineHeight: "150%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                    color: "#373643",
                  }}
                >
                  Your information is 100% safe and secure on this website
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormContext.Provider>
  );
}
