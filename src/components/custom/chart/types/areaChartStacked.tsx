"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import ChartWrapper from "@/components/custom/chart"

export default function AreaStackedChart ( { size , chartData , chartConfig , header, footer } ) {
    return (
        <ChartWrapper chartSize={ size } chartConfig={ chartConfig } header={ header } footer={ footer }>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 
          }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {Object.keys(chartConfig).map((key, index) => (
              <Area
                key={index}
                dataKey={key}
                type="natural"
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartWrapper>
    )
}