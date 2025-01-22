"use client";

import type React from "react";
import { forwardRef, useRef } from "react";
import { Button } from "./button";
import clsx from "clsx";
import { UploadIcon } from "lucide-react";
import { Label } from "./label";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  buttonTitle?: string;
  icon?: React.ReactNode;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      icon,
      errorMessage,
      label,
      buttonTitle = "Upload",
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
      const input = inputRef.current;
      if (input) {
        input.click();
      }
    };

    return (
      <>
        <div
          className={clsx(
            "relative flex flex-col gap-1 w-full rounded transition-colors duration-200",
            className
          )}
        >
          {label && <Label className="mb-1">{label}</Label>}
          <input
            {...props}
            ref={(e) => {
              inputRef.current = e;
              if (typeof ref === "function") ref(e);
              else if (ref)
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = e;
            }}
            disabled={disabled}
            aria-invalid={!!errorMessage}
            type="file"
            className="hidden"
          />
          <Button
            onClick={handleButtonClick}
            disabled={disabled}
            className="w-fit"
            variant="subtle"
          >
            {icon && <span className="mr-2">{icon}</span>}
            <UploadIcon strokeWidth={1} size={18} />
            {buttonTitle}
          </Button>
        </div>
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
