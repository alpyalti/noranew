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
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 cursor-pointer" disabled={disabled}>
        <div className="flex items-center gap-2">
          <div className={cn(
            "rounded-full h-6 w-6 flex items-center justify-center text-sm",
            isActive || isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
          <h3 className={cn(
            "font-medium",
            disabled && !isActive && "text-muted-foreground"
          )}>{title}</h3>
        </div>
        {isActive ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 pt-0 transition-transform duration-200 ease-out data-[state=closed]:translate-y-1 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
} 