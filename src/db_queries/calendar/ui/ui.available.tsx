import Title from "@/app/reusables/content/title";
import { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"

import { WeekScheduleProps } from "@/app/(pages)/(authed)/admin/students/calendar/comps/availability";

export default function DisplayWhenAvailable ( { weekSchedule } : WeekScheduleProps ) {
        const selectedDays = Object.entries(weekSchedule).filter(([_, schedule]) => schedule.selected);

        useEffect((  ) => {
           console.log( 'schedule' , weekSchedule )
        }, [ weekSchedule ] );
      
        return (
            <Popover>
                <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    View as
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                <h2 className="text-lg font-semibold mb-2"> Tutor Availability: </h2>
                {selectedDays.length > 0 ? (
                    <ul className="space-y-1">
                    {selectedDays.map(([day, schedule]) => (
                        <Card key={day} className="flex justify-between p-3">
                        <span>{day}:</span>
                        <span>
                            {schedule.startTime} - {schedule.endTime}
                        </span>
                        </Card>
                    ))}
                    </ul>
                ) : (
                    <p>No days selected</p>
                )}
                </PopoverContent>
            </Popover>
         )
}