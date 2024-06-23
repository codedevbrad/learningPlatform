'use client'
import Card from "@/app/reusables/layouts/card"

export default function Statistics ( ) {
    return (
        <div className="flex flex-row space-x-3">
            <Card title="Total Revenue">
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </Card>
            <Card title="New users">
                <div className="text-2xl font-bold"> 20 </div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </Card>
            <Card title="Sessions booked">
                <div className="text-2xl font-bold"> 15 </div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </Card>
        </div>
    )
}