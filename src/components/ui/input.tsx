import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Extend the InputProps interface to include maxLength
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  charLimit?: number; // Add charLimit as an optional prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type="text", className, value = "", onChange, charLimit = 45, ...props }, ref) => {
    const [count, setCount] = useState(0); // State to manage character count
    const [warning, setWarning] = useState(false); // State to manage warning visibility

    useEffect(() => {
      setCount(value.length); // Set count to the length of the value
      setWarning(value.length >= charLimit); // Show warning if count exceeds the limit
    }, [value, charLimit]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Allow input only if within the limit or if the change reduces the text
      if (e.target.value.length <= charLimit || e.target.value.length < value.length) {
        onChange && onChange(e); // Call the original onChange handler if provided
      }
    };

    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        />
        { type == "text" &&
              <>
              <div className="mt-2 text-right text-sm text-muted-foreground">
                {count}/{charLimit} characters
              </div>
              {warning && (
                <div className="mt-1 text-right text-xs text-red-500">
                  Limit reached! You can only delete characters now.
                </div>
              )}
              </>
        }
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };