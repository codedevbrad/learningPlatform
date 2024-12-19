'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Title from '@/app/reusables/content/title'
import DisplayWhenAvailable from '@/db_queries/calendar/ui/ui.available'
import { getAvailability, saveAvailability } from '@/db_queries/calendar/queries/admin.queries'
import LoadingButton from '@/components/custom/buttons/button.plain'

type DaySchedule = {
  selected: boolean;
  startTime: string;
  endTime: string;
}

export type WeekScheduleProps = {
  [key: string]: DaySchedule;
}

const initialWeekSchedule: WeekScheduleProps = {
  Sunday: { selected: false, startTime: '09:00', endTime: '10:00' }, 
  Monday: { selected: false, startTime: '09:00', endTime: '10:00' }, 
  Tuesday: { selected: false, startTime: '09:00', endTime: '10:00' },
  Wednesday: { selected: false, startTime: '09:00', endTime: '10:00' },
  Thursday: { selected: false, startTime: '09:00', endTime: '10:00' },
  Friday: { selected: false, startTime: '09:00', endTime: '10:00' },
  Saturday: { selected: false, startTime: '09:00', endTime: '10:00' }
};

export default function WeekdayTimeSelector({ setAvailability}) {
  const [weekSchedule, setWeekSchedule] = useState<WeekScheduleProps>(initialWeekSchedule);
  const [initialSchedule, setInitialSchedule] = useState<WeekScheduleProps | null>(null);
  const [isSaving, setIsSaving] = useState(false);

   // Update parent availability whenever the weekSchedule changes
   useEffect(() => {
    const selectedDays = Object.entries(weekSchedule)
      .filter(([_, schedule]) => schedule.selected)
      .map(([day]) => day);
    setAvailability(selectedDays);
  }, [weekSchedule, setAvailability]);

  // Fetch the current availability on initial load
  useEffect(() => {
    const fetchAvailability = async () => {
      const response = await getAvailability();
      if (response) {
        setWeekSchedule(response);
        setInitialSchedule(response);
      } else {
        // If no response, we consider the initial weekSchedule as the initial state
        setInitialSchedule(initialWeekSchedule);
      }
    };
    fetchAvailability();
  }, []);

  

  // Check if there are changes compared to the initial schedule
  const hasChanges = initialSchedule && JSON.stringify(weekSchedule) !== JSON.stringify(initialSchedule);

  const toggleDay = (day: string) => {
    setWeekSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], selected: !prev[day].selected },
    }));
  };

  const updateTime = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setWeekSchedule((prev) => {
      const updatedDay = { ...prev[day] };

      if (field === 'startTime') {
        updatedDay.startTime = value;

        const [hours, minutes] = value.split(':').map(Number);
        const newEndTime = new Date();
        newEndTime.setHours(hours + 1); // Add 1 hour
        newEndTime.setMinutes(minutes);

        updatedDay.endTime = `${String(newEndTime.getHours()).padStart(2, '0')}:${String(
          newEndTime.getMinutes()
        ).padStart(2, '0')}`;
      } else {
        updatedDay.endTime = value;
      }

      return {
        ...prev,
        [day]: updatedDay,
      };
    });
  };

  // Save the availability
  const saveSchedule = async () => {
    setIsSaving(true);
    await saveAvailability(weekSchedule);
    setInitialSchedule(weekSchedule); // After saving, update the initial schedule to current
    setIsSaving(false);
  };

  return (
    <div className="space-y-4">

      <div className="flex flex-row items-center justify-between">
        <Title title="Tutor Availability" variant="heading" noMargin={true} />
        <div className="flex justify-between items-center">
          <DisplayWhenAvailable weekSchedule={ weekSchedule }  />
        </div>
      </div>

      {hasChanges && (
        <LoadingButton onClick={saveSchedule} isLoading={isSaving}>
          Save Availability
        </LoadingButton>
      )}

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
                <span
                  className={cn(
                    "text-sm px-2 py-1 rounded-full",
                    schedule.selected
                      ? "bg-primary-foreground text-primary"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
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
  );
}
