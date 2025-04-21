import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface StepSectionProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted?: boolean;
  stepNumber: number;
  totalSteps: number;
  onToggle: (isOpen: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function StepSection({
  title,
  icon,
  isActive,
  isCompleted = false,
  stepNumber,
  totalSteps,
  onToggle,
  disabled = false,
  children
}: StepSectionProps) {
  return (
    <Collapsible
      open={isActive}
      onOpenChange={(open: boolean) => onToggle(open)}
      className="border rounded-lg"
      disabled={disabled}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-3 sm:p-4 cursor-pointer" disabled={disabled}>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className={cn(
            "rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-sm",
            isActive || isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
          <h3 className={cn(
            "font-medium text-sm sm:text-base",
            disabled && !isActive && "text-muted-foreground"
          )}>{title}</h3>
        </div>
        {isActive ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 transition-transform duration-200 ease-out data-[state=closed]:translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
} 