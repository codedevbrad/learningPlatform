'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarDays } from "lucide-react"
import Title from '@/app/reusables/content/title'

type DaySchedule = {
  selected: boolean;
  startTime: string;
  endTime: string;
}

type WeekSchedule = {
  [key: string]: DaySchedule;
}

const initialWeekSchedule: WeekSchedule = {
  'Monday': { selected: true, startTime: '09:00', endTime: '17:00' },
  'Tuesday': { selected: false, startTime: '09:00', endTime: '17:00' },
  'Wednesday': { selected: false, startTime: '09:00', endTime: '17:00' },
  'Thursday': { selected: false, startTime: '09:00', endTime: '17:00' },
  'Friday': { selected: false, startTime: '09:00', endTime: '17:00' },
  'Saturday': { selected: false, startTime: '09:00', endTime: '17:00' },
  'Sunday': { selected: false, startTime: '09:00', endTime: '17:00' },
}

export default function WeekdayTimeSelector() {
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>(initialWeekSchedule)

  const toggleDay = (day: string) => {
    setWeekSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], selected: !prev[day].selected }
    }))
  }

  const updateTime = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setWeekSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }))
  }

  const selectedDays = Object.entries(weekSchedule).filter(([_, schedule]) => schedule.selected)

  return (
    <div className="space-y-4">
       
      <div className='flex flex-row items-center justify-between'>
          <Title title="Tutor Availability" variant="heading" noMargin={true} />

          <div className="flex justify-between items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  View as
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align='end' >
                <h2 className="text-lg font-semibold mb-2"> Chosen Availability:</h2>
                {selectedDays.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedDays.map(([day, schedule]) => (
                      <Card key={day} className="flex justify-between p-3">
                        <span>{day}:</span>
                        <span>{schedule.startTime} - {schedule.endTime}</span>
                      </Card>
                    ))}
                  </ul>
                ) : (
                  <p>No days selected</p>
                )}
              </PopoverContent>
            </Popover>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Object.entries(weekSchedule).map(([day, schedule]) => (
          <Card
            key={day}
            className={cn(
              "transition-all duration-200 ease-in-out",
              schedule.selected
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-accent"
            )}
          >
            <CardContent className="p-4">
              <div 
                className="flex items-center justify-between cursor-pointer mb-2"
                onClick={() => toggleDay(day)}
              >
                <span className="text-lg font-semibold">{day}</span>
                <span className={cn(
                  "text-sm px-2 py-1 rounded-full",
                  schedule.selected ? "bg-primary-foreground text-primary" : "bg-secondary text-secondary-foreground"
                )}>
                  {schedule.selected ? 'Selected' : 'Unselected'}
                </span>
              </div>
              {schedule.selected && (
                <div className="mt-2 space-y-2">
                  <div>
                    <Label htmlFor={`${day}-start`}>Start Time</Label>
                    <Input
                      id={`${day}-start`}
                      type="time"
                      value={schedule.startTime}
                      onChange={(e) => updateTime(day, 'startTime', e.target.value)}
                      className="bg-primary-foreground text-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${day}-end`}>End Time</Label>
                    <Input
                      id={`${day}-end`}
                      type="time"
                      value={schedule.endTime}
                      onChange={(e) => updateTime(day, 'endTime', e.target.value)}
                      className="bg-primary-foreground text-primary"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}