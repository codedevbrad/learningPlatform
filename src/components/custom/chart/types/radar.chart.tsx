"use client"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import ChartWrapper from "@/components/custom/chart"


/*
    convert to loop the objects and create radars dyanmically.
*/

export default function ChartRadar ( { size , chartData , chartConfig , header, footer } ) {
    return (
        <ChartWrapper chartSize={ size } chartConfig={ chartConfig } header={ header } footer={ footer }>
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar dataKey="a" fill="hsl(var(--chart-2))" fillOpacity={0.3}  />
            <Radar dataKey="b" fill="hsl(var(--chart-4))" fillOpacity={0.6}  />
            <Radar dataKey="c" fill="hsl(var(--chart-4))" fillOpacity={0.6}  />
          </RadarChart>
        </ChartWrapper>
    )
}