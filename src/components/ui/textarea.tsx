'use client'

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import AddLoremIspum from "@/app/reusables/usables/loremIspumGenerator"
import { useTextStateWithCatches , CharacterCountDisplay , LimitWarning } from "@/app/reusables/usables/useCharacterCount";


export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    wordLimit?: number;
    updateContentbyLorem?: (newContent: string) => void;
    children?: React.ReactNode;
}
  
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
        className,
        value = "",
        onChange,
        wordLimit = 100,
        children,
        updateContentbyLorem,
        displayLoremIspum = false,
        ...props
      }, ref ) => {
        
      const { state, setState, count, warning } = useTextStateWithCatches(value, wordLimit);
  
      // Sync external value prop with local state
      useEffect(() => {
        setState(value);
      }, [value]);
  
      // Handle input change
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (newValue.length <= wordLimit ) {
          setState(newValue);
          onChange && onChange(e); // Call the original onChange handler if provided
        }
      };
  
      return (
        <>
          <textarea
            className={cn(
              "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            value={state}
            onChange={ handleChange }
            {...props}
          />
          <CharacterCountDisplay count={count} wordLimit={wordLimit} />
          <LimitWarning warning={warning.limitReached} />
          <div className="flex justify-end">
            {children}
            {displayLoremIspum && (
              <AddLoremIspum
                content={state}
                onUpdate={updateContentbyLorem!}
                wordLimit={wordLimit}
              />
            )}
          </div>
        </>
      );
    }
);

Textarea.displayName = "Textarea";
  
export { Textarea };


// import React, { useEffect, useState } from "react"
// import { cn } from "@/lib/utils"

// import AddLoremIspum from "@/app/reusables/usables/loremIspumGenerator"


// // Props for the Textarea component
// export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
//   wordLimit?: number; // Limit for the character count in the textarea
//   updateContentbyLorem?: (newContent: string) => void; // Function to update content via AddLoremIspum
//   children?: React.ReactNode; // Optional children to render inside the component
// }

// const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
//   ({ className, value = "", onChange, wordLimit = 45, children, updateContentbyLorem, displayLoremIspum = false , ...props }, ref) => {
//     const [localValue, setLocalValue] = useState(value); // Local state for managing textarea value
//     const [count, setCount] = useState(0); // State to manage character count
//     const [warning, setWarning] = useState(false); // State to manage warning visibility

//     useEffect(() => {
//       setCount(localValue.length); // Set count to the length of the local value
//       setWarning(localValue.length >= wordLimit); // Show warning if count exceeds the limit
//     }, [localValue, wordLimit]);

//     // Sync external value prop with local state
//     useEffect(() => {
//       setLocalValue(value);
//     }, [value]);

//     // Handle input change
//     const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       const newValue = e.target.value;
//       if (newValue.length <= wordLimit || newValue.length < localValue.length) {
//         setLocalValue(newValue); // Update the local state
//         onChange && onChange(e); // Call the original onChange handler if provided
//       }
//     };

//     return (
//       <>
//         <textarea
//           className={cn(
//             "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
//             className
//           )}
//           ref={ref}
//           value={localValue}
//           onChange={handleChange}
//           {...props}
//         />
//         <div className="mt-2 text-right text-sm text-muted-foreground">
//           {count}/{wordLimit} characters
//         </div>
//         {warning && (
//           <div className="mt-1 text-right text-xs text-red-500">
//             Limit reached! You can only delete characters now.
//           </div>
//         )}
//         <div className="flex justify-end">
//           {children}
//           { displayLoremIspum &&
//             <AddLoremIspum content={localValue} onUpdate={updateContentbyLorem!} wordLimit={wordLimit} />
//           }
//         </div>
//       </>
//     );
//   }
// );

// Textarea.displayName = "Textarea";

// export { Textarea };