"use client"

import { ChartConfig } from "@/components/ui/chart"
import ChartRadar from "@/components/custom/chart/types/radar.chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function ChartUsers ( { size = "single" } ) {
        
    const chartData = [
        { month: "January", a: 186, b: 80, c: 200  },
        { month: "February", a: 305, b: 200, c: 60 },
        { month: "March", a: 237, b: 120, c: 50 },
        { month: "April", a: 73, b: 190, c: 30 }
      ]
      const chartConfig = {
        ag: {
          label: "aa",
          color: "hsl(var(--chart-1))"
        },
        b: {
          label: "bb",
          color: "hsl(var(--chart-2))"
        },
        c: {
          label: 'cc',
          color: "hsl(var(--chart-2))",
        }
      } satisfies ChartConfig

    return (
        <ChartRadar 
            size={ size } 
            chartConfig={ chartConfig } 
            chartData={ chartData } 
            header={ 
                <CardHeader>
                    <CardTitle>Topics performance</CardTitle>
                    <CardDescription>
                    Showing page visits for the last 6 months across top 5 topics
                    </CardDescription>
                </CardHeader>
            }
            footer={ 
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                        January - June 2024
                        </div>
                    </div>
                    </div>
                </CardFooter>
            }
        />
    )
}