type DaySchedule = {
    selected: boolean; // Whether the day is active
    startTime: string; // Start time in "HH:mm" format
    endTime: string;   // End time in "HH:mm" format
};
  
type AvailabilityType = {
    Monday: DaySchedule;
    Tuesday: DaySchedule;
    Wednesday: DaySchedule;
    Thursday: DaySchedule;
    Friday:  DaySchedule;
    Saturday: DaySchedule;
    Sunday: DaySchedule;
};

export type {
    AvailabilityType
}