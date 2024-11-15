'use client'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

interface FeatureDisabledType {
  children?: any;
  explanation: string;
  className?: string; 
  displayTipType: 'tooltip' | 'feature'
}

export default function FeatureDisabled({ children, explanation, className, displayTipType = 'tooltip' } : FeatureDisabledType ) {

  let tooltip = `This Feature is disabled while your tutor accepts you to the platform. Once accepted, you can then ${explanation}`;
  
  return (
    <TooltipProvider>
      {displayTipType === 'tooltip' ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`cursor-pointer  rounded-md bg-gray-300 opacity-50 relative overflow-hidden ${className}`}
              style={{
                backgroundImage: `repeating-linear-gradient(
                  135deg,
                  rgba(128, 128, 128, 0.2),
                  rgba(128, 128, 128, 0.2) 10px,
                  rgba(255, 255, 255, 0.2) 10px,
                  rgba(255, 255, 255, 0.2) 20px
                )`,
              }}
            >
              <div className="pointer-events-none">
                {children}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="w-[300px] p-5">
            { tooltip }
          </TooltipContent>
        </Tooltip>
      ) : (
        <div
          className={`cursor-not-allowed pointer-events z-50 rounded-md relative overflow-hidden ${className}`}
          style={{
            backgroundImage: `repeating-linear-gradient(
              135deg,
              rgba(128, 128, 128, 0.2),
              rgba(128, 128, 128, 0.2) 10px,
              rgba(255, 255, 255, 0.2) 10px,
              rgba(255, 255, 255, 0.2) 20px
            )`,
          }}
        >
          <div>
            {children}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50  px-4">
            <div className="w-3/5 p-5 py-8 bg-white text-black text-center rounded-lg">
            { tooltip }
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
}