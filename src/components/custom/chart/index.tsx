"use client"
import { ChartContainer } from "@/components/ui/chart"

type SizeOption = "full" | "half" | "single"

interface ComponentProps {
  chartSize?: SizeOption;
  children: any;
  chartConfig: any;
}

export default function ChartWrapper({ chartSize = "single" , children , chartConfig , header , footer }: ComponentProps) {

  const sizeClasses = {
    full:  { card: "w-full col-span-3" , height: 'h-[300px]' }, // Adjusted height for full
    half:  { card: "w-full col-span-2" , height: 'h-[300px]' }, // Adjusted height for half
    single:{ card: "col-span-1"        , height: ''}, // Default height for single
  }

  return (
    <div className={` ${sizeClasses[chartSize].card}`}>
        { header }
        <ChartContainer config={chartConfig} className={`rounded-lg w-full ${ sizeClasses[chartSize].height}`}>
            { children } 
        </ChartContainer>
        { footer }
    </div>
  )
}