'use client'
import React, { useEffect, useState } from "react";
 
// Hook for managing character count and warning
export const useCharacterCount = (initialValue: string, wordLimit: number) => {
  const [localValue, setLocalValue] = useState(initialValue); // Local state for managing textarea value
  const [count, setCount] = useState(initialValue.length); // Character count
  const [warning, setWarning] = useState(false); // Warning visibility

  useEffect(() => {
    setCount(localValue.length); // Update character count
    setWarning(localValue.length >= wordLimit); // Update warning visibility
  }, [localValue, wordLimit]);

  return {
    localValue,
    setLocalValue,
    count,
    warning,
  };
};


// Component for displaying the character count
export const CharacterCountDisplay: React.FC<{ count: number; wordLimit: number }> = ({
  count,
  wordLimit,
}) => (
  <div className="mt-2 text-right text-sm text-muted-foreground">
    {count}/{wordLimit} characters
  </div>
);


// Component for displaying the warning message
export const LimitWarning: React.FC<{ warning: boolean }> = ({ warning }) =>
  warning ? (
    <div className="mt-1 text-right text-xs text-red-500">
      Limit reached! You can only delete characters now.
    </div>
) : null;