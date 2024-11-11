"use client"

import { ChartConfig } from "@/components/ui/chart"
import AreaStackedChart from "@/components/custom/chart/types/areaChartStacked"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function ChartTopics ( { size = "single" } ) {
        
    interface ChartData {
        month: string
        topicA: number
        topicB: number
        topicC: number
        topicD: number
        topicE: number
    }

    const chartData: ChartData[] = [
        { month: "January", topicA: 220, topicB: 150, topicC: 320, topicD: 180, topicE: 210 },
        { month: "February", topicA: 305, topicB: 200, topicC: 250, topicD: 230, topicE: 260 },
        { month: "March", topicA: 237, topicB: 120, topicC: 330, topicD: 150, topicE: 270 },
        { month: "April", topicA: 73, topicB: 190, topicC: 140, topicD: 220, topicE: 300 },
        { month: "May", topicA: 209, topicB: 130, topicC: 300, topicD: 170, topicE: 280 },
        { month: "June", topicA: 214, topicB: 140, topicC: 310, topicD: 210, topicE: 320 },
    ];
    
    const chartConfig: ChartConfig = {
        topicA: {
            label: "Topic A",
            color: "hsl(var(--chart-1))",
        },
        topicB: {
            label: "Topic B",
            color: "hsl(var(--chart-2))",
        },
        topicC: {
            label: "Topic C",
            color: "hsl(var(--chart-3))",
        },
        topicD: {
            label: "Topic D",
            color: "hsl(var(--chart-4))",
        },
        topicE: {
            label: "Topic E",
            color: "hsl(var(--chart-5))",
        },
    }

    return (
        <AreaStackedChart 
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