'use client'
import { DollarSign } from "lucide-react"
import { Card,
CardContent,
CardHeader,
CardTitle,
} from "@/components/ui/card"

function ShadCard ({ title , children }) {
  return (
    <Card className="flex-grow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium"> { title } </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
            { children }
      </CardContent>
    </Card>
  )
}


export default function Statistics ( ) {
    return (
        <div className="flex flex-row space-x-3">
            <ShadCard title="Total Revenue">
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </ShadCard>
            <ShadCard title="New users">
                <div className="text-2xl font-bold"> 20 </div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </ShadCard>
            <ShadCard title="Sessions booked">
                <div className="text-2xl font-bold"> 15 </div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </ShadCard>
        </div>
    )
}