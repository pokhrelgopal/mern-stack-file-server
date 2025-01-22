"use client";

import React from "react";
import { cn } from "@/utils/tw-merge";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  containerClassName?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  value,
  onChange,
  error,
  containerClassName,
}) => {
  return (
    <div className={cn("-z-10 flex flex-col gap-2", containerClassName)}>
      {options.map((option, index) => (
        <label
          key={index}
          className={cn(
            "-z-10 flex items-center gap-2",
            "cursor-pointer",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className={cn(
              "h-4 w-4 rounded-full border border-gray-300 -z-10",
              "checked:bg-primary focus:ring-0",
              "transition-colors duration-200",
              error && "border-destructive focus:ring-0"
            )}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
