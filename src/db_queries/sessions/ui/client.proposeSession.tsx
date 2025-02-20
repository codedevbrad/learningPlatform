"use client"

import * as React from "react"
import { format, formatDistance } from "date-fns"
import { Button } from "@/components/ui/button"
import Calendar from '@/components/custom/calendar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import useSWR, { mutate } from "swr"
import { action__getProposedSession, action__proposeSession, action__acceptProposal } from "./client.actions"

// Additional imports for availability and custom calendar UI:
import Title from "@/app/reusables/content/title"
import { fetchAvailability } from "@/app/services/calendar/fetchevents"

// Utility function to format the session length
const formatLength = (length: number): string => {
  const hours = Math.floor(length / 60);
  const minutes = length % 60;
  return `${hours > 0 ? `${hours}h` : ""}${hours > 0 && minutes > 0 ? " " : ""}${minutes > 0 ? `${minutes}m` : ""}`;
};

interface SessionProposalProps {
  studentId: string;
  updateProposed: (session: any) => void;
  initialSession?: any;
  userType: 'Teacher' | 'Student';
}

const SessionProposal: React.FC<SessionProposalProps> = ({ studentId, updateProposed, initialSession, userType }) => {
  const [proposalPopupState, changeProposalState] = useState<boolean>(false);
  const [sessionTitle, setSessionTitle] = useState<string>(initialSession?.title || "");

  // State related to date/time availability
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [availableTimes, setAvailableTimes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [extraMinutes, setExtraMinutes] = React.useState(0);
  const [canAddMoreTime, setCanAddMoreTime] = React.useState(true);

  useEffect(() => {
    setSessionTitle(initialSession?.title || "");
    if (initialSession?.date) {
      setSelectedDate(new Date(initialSession.date));
    } else {
      setSelectedDate(new Date(new Date().setDate(new Date().getDate()+1)));
    }

    if (initialSession?.length) {
      const initialExtra = initialSession.length > 60 ? (initialSession.length - 60) : 0;
      setExtraMinutes(initialExtra);
    } else {
      setExtraMinutes(0);
    }
  }, [initialSession]);

  useEffect(() => {
    if (!selectedDate) return;

    async function loadAvailability() {
      setLoading(true);
      try {
        const busySlots = await fetchAvailability();
        const allFreeSlots = calculateFreeSlots(busySlots);
        const times = getAvailableTimes(allFreeSlots, selectedDate);
        setAvailableTimes(times);
      } catch (error) {
        console.error('Error loading availability:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAvailability();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) {
      const startTime = new Date(selectedTime);
      const currentEndTime = new Date(startTime);
      currentEndTime.setMinutes(startTime.getMinutes() + 60 + extraMinutes); // Current session end time

      const selectedSlot = availableTimes.find((time) => time.value === selectedTime);
      if (!selectedSlot) return;
      const slotEndTime = new Date(selectedSlot.slotEnd);

      // Determine if adding 30 minutes would exceed the available time
      const newEndTime = new Date(currentEndTime);
      newEndTime.setMinutes(newEndTime.getMinutes() + 30);

      setCanAddMoreTime(newEndTime <= slotEndTime);
    }
  }, [extraMinutes, selectedTime, availableTimes]);

  const calculateFreeSlots = (busySlots) => {
    const freeSlots = [];
    const timeMin = new Date(); // Current time
    const timeMax = new Date(new Date().setDate(new Date().getDate() + 7)); // 7 days from now

    let lastEnd = timeMin;

    // Calculate gaps between busy slots
    busySlots.forEach(({ start, end }) => {
      const slotStart = new Date(start);
      const slotEnd = new Date(end);

      if (lastEnd < slotStart) {
        freeSlots.push({ start: lastEnd, end: slotStart });
      }

      lastEnd = slotEnd > lastEnd ? slotEnd : lastEnd;
    });

    // Add final slot if there's free time until timeMax
    if (lastEnd < timeMax) {
      freeSlots.push({ start: lastEnd, end: timeMax });
    }

    return freeSlots;
  };

  const getAvailableTimes = (freeSlots, date) => {
    const times = [];
    const selectedDay = date.toISOString().split('T')[0]; // Keep only date part

    freeSlots.forEach((slot) => {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);

      while (slotStart < slotEnd) {
        const sessionStart = new Date(slotStart);
        const sessionEnd = new Date(sessionStart);
        sessionEnd.setMinutes(sessionStart.getMinutes() + 60); // Add 1 hour

        const sessionDay = sessionStart.toISOString().split('T')[0];
        if (
          sessionDay === selectedDay &&
          sessionEnd <= slotEnd
        ) {
          times.push({
            label: `${sessionStart.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}`,
            value: sessionStart.toISOString(),
            slotEnd: slotEnd.toISOString(),
          });
        }

        slotStart.setMinutes(slotStart.getMinutes() + 15); // Increment by 15 mins
      }
    });

    return times;
  };

  const handleAddExtraMinutes = () => {
    setExtraMinutes(extraMinutes + 30);
  };

  const proposeSessionSubmit = async () => {
    if(!selectedTime) {
      console.error("No time selected");
      return;
    }
    const startTime = new Date(selectedTime);
    const sessionLength = 60 + extraMinutes;
    const sessionDate = startTime;

    try {
      await action__proposeSession({
        studentId,
        sessionData: {
          title: sessionTitle,
          date: sessionDate,
          length: sessionLength,
          studentId,
          proposer: userType.toUpperCase()
        },
      });

      // Optimistic UI update
      updateProposed({
        title: sessionTitle,
        date: sessionDate,
        length: sessionLength,
      });

      changeProposalState(false);

      // Revalidate the session data
      mutate(`fetchProposedSession-${studentId}`);
    } 
    catch (error) {
      console.error('Failed to propose session:', error);
    }
  };

  return (
    <Popover open={proposalPopupState} onOpenChange={changeProposalState}>
      <PopoverTrigger asChild>
        <Button>
          {initialSession ? 'Change proposed session' : 'Propose a new session'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-80 mt-2" align="end">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="p-3 mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Session Title"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
            />
            <Title title="Pick a Date" variant="subheading3" />
            <Calendar 
             className='w-full' 
             selectedDate={selectedDate}
             onDateChange={setSelectedDate} 
             blockedDays={[0, 6]} />
          </div>
          
          {loading ? (
            <p className="mt-4 text-sm">Loading available times...</p>
          ) : availableTimes.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-md font-semibold">Pick a Time</h2>
              <Select onValueChange={(value) => { setSelectedTime(value); setExtraMinutes(0); }}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((time, index) => (
                    <SelectItem key={index} value={time.value}>
                      {time.label} 
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedTime && (
                <div className="mt-4 flex flex-col space-y-4 bg-gray-50 p-2 pb-5 rounded-md">
                  <p className='p-2 text-sm'>You've selected a session for</p>
                  <div className='flex flex-row flex-wrap items-center space-x-1 justify-center text-sm'>
                    <span className='bg-gray-200 p-2 rounded-md'>
                      {new Date(selectedTime).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </span> 
                    <span> - </span> 
                    <span className='bg-gray-200 p-2 rounded-md'>
                      {new Date(
                        new Date(selectedTime).getTime() + (60 + extraMinutes) * 60 * 1000
                      ).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </span>
                  </div>    

                  <div className='flex flex-col space-y-2 text-sm'>
                    <p>Which will be for:</p>
                    <span className='bg-gray-200 p-2 rounded-md'>
                      {formatLength(60 + extraMinutes)}
                    </span>
                  </div>  
               
                  { canAddMoreTime && (
                    <Button
                      className="mt-4"
                      onClick={handleAddExtraMinutes}
                      disabled={!canAddMoreTime}
                    >
                      Add 30 minutes
                    </Button>
                  )}

                  <Button onClick={proposeSessionSubmit}>
                    Propose this session 
                  </Button>
                </div>
              )}
            </div>
          ) : (
            selectedDate && (
              <p className="mt-4 text-sm">No available times for the selected day.</p>
            )
          )}
          
          <div className="flex items-center justify-center">
            <Button variant="destructive" onClick={() => changeProposalState(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface SessionProposedDisplayProps {
  studentId: string;
  userType: 'Teacher' | 'Student';
}

const SessionProposedDisplay: React.FC<SessionProposedDisplayProps> = ({ studentId, userType }) => {
  let oppositeUser = userType == 'Student' ? 'Teacher' : 'Student'; 

  const fetcher = async () => {
    try {
      console.log(`Fetching proposed session for studentId: ${studentId}`);
      const data = await action__getProposedSession({ studentId });
      console.log('Fetched data:', data);
      return data;
    } 
    catch (error) {
      console.error('Failed to fetch proposed session:', error);
      return null;
    }
  };

  const { data: proposedSession, error, isValidating } = useSWR(`fetchProposedSession-${studentId}`, fetcher, {
    onSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error) => {
      console.log('Error fetching data:', error);
    },
  });

  const handleAcceptProposal = async () => {
    try {
      await action__acceptProposal({ studentId });
      // Revalidate the session data after accepting the proposal
      mutate(`fetchProposedSession-${studentId}`);
    } catch (error) {
      console.error('Failed to accept the session:', error);
    }
  };

  const updateProposed = (session) => {
    // This function can trigger a revalidation if needed.
    mutate(`fetchProposedSession-${studentId}`);
  };

  if (error) return <div>Error loading any session</div>;

  // Compute start and end times if proposedSession is available
  let sessionStartTime, sessionEndTime;
  if (proposedSession) {
    sessionStartTime = new Date(proposedSession.date);
    sessionEndTime = new Date(sessionStartTime.getTime() + proposedSession.length * 60000);
  }

  return (
    <Card className={`my-5 ${proposedSession ? 'bg-black shadow-2xl' : ''}`}>
      <CardHeader className="flex">
        {isValidating ? (
          null
        ) : proposedSession && (
          <div className="flex flex-row items-center space-x-4 mb-4">
            <div className="grow text-white bg-gray-900 p-3 text-sm rounded-md ">
              <h1 className="text-md font-bold">
                { proposedSession && proposedSession.proposer != userType.toUpperCase() ? (
                  `You have a Proposed Session by the ${ oppositeUser }`   
                ) : (
                  'You have proposed a new session.'
                )}
              </h1>  
            </div>
          </div>
        )}
        <CardTitle className={`text-2xl font-semibold ${proposedSession ? 'text-white' : 'text-gray-800'}`}>
          {isValidating ? 'Loading...' : (proposedSession ? proposedSession.title : 'No proposed sessions')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isValidating ? (
          <p className="text-gray-500 text-md">Loading session details...</p>
        ) : !proposedSession ? (
          <p className="text-gray-500 text-md">
            Any proposed sessions will appear here. 
            A session needs to be accepted and confirmed by both Student and Teacher.
          </p>
        ) : (
          <div className="flex flex-col space-y-5">
            <div>
              <p className={` ${proposedSession ? 'text-gray-400' : 'text-gray-500'} text-md`}>
                You have a session of {formatLength(proposedSession.length)} proposed for {format(new Date(proposedSession.date), "PPP")} 
                {sessionStartTime && sessionEndTime && (
                  <> at {format(sessionStartTime, "p")} - {format(sessionEndTime, "p")}</>
                )}.
                This session will take place {formatDistance(new Date(proposedSession.date), new Date(), { addSuffix: true })}.
              </p>
            </div>
            <div>        
              <p className="text-gray-400">
                { proposedSession && proposedSession.proposer != userType.toUpperCase() ? (
                  `Either confirm, change the proposed session details or decline the proposed session.`
                ) : (
                  `You'll have to wait for the ${ oppositeUser } to accept this lesson request.`
                )}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-3">
        <SessionProposal
          key={proposedSession ? proposedSession.id : 'new-session'}
          updateProposed={updateProposed}
          initialSession={proposedSession}
          studentId={studentId}
          userType={ userType }
        />
        {proposedSession && proposedSession?.proposer !== userType.toUpperCase() && (
          <Button className="bg-blue-600" onClick={handleAcceptProposal}>
            Accept Session
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SessionProposedDisplay;