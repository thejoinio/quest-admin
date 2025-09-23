import React, { ReactNode } from "react";
import { useTutorial } from "@/context/tutorial-context";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface TutorialStepProps {
  stepNumber: number;
  children: ReactNode;
  position: string;
  description: string;
  title: string;
  className?: string;
}

const TutorialStep = ({
  stepNumber,
  children,
  position,
  description,
  title,
  className
}: TutorialStepProps) => {
  const { tutorialActive, currentStep, nextStep, endTutorial } = useTutorial();

  if (!tutorialActive) {
    return <>{children}</>;
  }
  if (currentStep !== stepNumber) {
    return <div className={cn("blur", className && className)}>{children}</div>;
  }

  return (
    <div className={cn("relative z-40", className && className)}>
      <>{children}</>
      <div
        className={`absolute flex flex-col tutorial-popover ${position} p-4 rounded-[5px] z-50 min-w-[207px]`}
      >
        <h2 className="text-xs font-semibold">{title}</h2>
        <div className="h-px w-full bg-[#8AE5CF] mt-1 mb-3" />
        <div className="flex flex-col gap-1">
          <p className="text-xs">{description}</p>
          <div className="flex items-center justify-between">
            <div onClick={endTutorial}>{currentStep}/6</div>
            {currentStep === 6 ? (
              <Button
                variant={"default-gradient"}
                className="h-[29px]"
                onClick={endTutorial}
              >
                Done
              </Button>
            ) : (
              <Button
                variant={"default-gradient"}
                className="h-[29px]"
                onClick={nextStep}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialStep;
