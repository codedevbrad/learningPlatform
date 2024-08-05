"use client";

import * as React from "react";
import { format, formatDistance, setHours, setMinutes, getHours, getMinutes, addDays, isAfter, isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { action__getProposedSession, action__proposeSession } from "./actions";

import { 
  PushSheet,
  PushSheetTrigger,
  PushSheetContent,
  PushSheetHeader,
  PushSheetTitle,
  PushSheetDescription,
  PushSheetFooter,
 } from "@/components/custom/sheetPush";


interface SessionProposalProps {
  studentId: string;
  updateProposed: (session: any) => void;
  initialSession?: any;
}

interface SessionProposedDisplayProps {
  studentId: string;
}

// Utility functions to generate hours and minutes options
const generateHoursOptions = (): { value: number; label: string }[] => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push({ value: i, label: i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM` });
  }
  return hours;
};

const generateMinutesOptions = (interval: number): { value: number; label: string }[] => {
  const minutes = [];
  for (let i = 0; i < 60; i += interval) {
    minutes.push({ value: i, label: i.toString().padStart(2, '0') });
  }
  return minutes;
};


// Helper function to format the session length
const formatLength = (length: number): string => {
  const hours = Math.floor(length / 60);
  const minutes = length % 60;
  return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m` : ""}`;
};


// SessionProposal component for proposing or updating a session ...
const SessionProposal: React.FC<SessionProposalProps> = ({ studentId, updateProposed, initialSession }) => {

  const hoursOptions = generateHoursOptions();
  const minutesOptions = generateMinutesOptions(15);

  const now = new Date();
  const tomorrow = addDays(now, 1);

  const [sessionTitle, setSessionTitle] = useState<string>(initialSession?.title || "");
  const [sessionDate, setSessionDate] = useState<Date>(initialSession?.date || tomorrow);
  const [sessionLength, setSessionLength] = useState<number>(initialSession?.length || 30);
  const [proposalPopupState, changeProposalState] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<number>(sessionDate ? getHours(sessionDate) : getHours(now));
  const [selectedMinute, setSelectedMinute] = useState<number>(sessionDate ? getMinutes(sessionDate) : getMinutes(now));

  // Filter hours to show only future hours if the selected date is today
  const filterHoursOptions = () => {
    const currentHour = getHours(now);
    if (isToday(sessionDate)) {
      return hoursOptions.filter(({ value }) => value > currentHour);
    }
    return hoursOptions;
  };

  useEffect(() => {
    setSessionTitle(initialSession?.title || "");
    setSessionDate(initialSession?.date || tomorrow);
    setSessionLength(initialSession?.length || 30);
    setSelectedHour(initialSession?.date ? getHours(initialSession.date) : getHours(now));
    setSelectedMinute(initialSession?.date ? getMinutes(initialSession.date) : getMinutes(now));
  }, [initialSession]);

  useEffect(() => {
    if (sessionDate) {
      const updatedDate = setMinutes(setHours(sessionDate, selectedHour), selectedMinute);
      setSessionDate(updatedDate);
    }
  }, [selectedHour, selectedMinute]);

  const incrementLength = () => {
    setSessionLength((prevLength) => prevLength + 15);
  };

  const decrementLength = () => {
    setSessionLength((prevLength) => Math.max(prevLength - 15, 15));
  };

  const proposeSessionSubmit = async () => {
    try {
      await action__proposeSession({
        studentId,
        sessionData: {
          title: sessionTitle,
          date: sessionDate,
          length: sessionLength,
          studentId,
          proposer: 'TEACHER'
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
    } catch (error) {
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
      <PopoverContent className="p-4 w-64 mt-2" align="end">
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
          </div>
          <div className="flex flex-col space-y-3">
            <label className="block text-sm font-medium text-gray-700">Date & Time</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={`w-full justify-start text-left font-normal ${!sessionDate && "text-muted-foreground"}`}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {sessionDate ? format(sessionDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={sessionDate}
                  onSelect={(date) => {
                    if (isAfter(date, now)) {
                      setSessionDate(date);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex space-x-3 mt-4">
              <Select value={selectedHour.toString()} onValueChange={(value) => setSelectedHour(parseInt(value))}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {filterHoursOptions().map(({ value, label }) => (
                    <SelectItem key={value} value={value.toString()}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedMinute.toString()} onValueChange={(value) => setSelectedMinute(parseInt(value))}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Minutes" />
                </SelectTrigger>
                <SelectContent>
                  {minutesOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value.toString()}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">Length</label>
            <div className="flex items-center space-x-2 ">
              <Button variant="outline" onClick={decrementLength}>-</Button>
              <span className="grow text-center"> {formatLength(sessionLength)} </span>
              <Button variant="outline" onClick={incrementLength}>+</Button>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
          <Button onClick={proposeSessionSubmit}>
            Propose
          </Button>
          <div className="flex items-center justify-center">
            <span className="text-white bg-red-700 p-3 rounded-md text-sm grow text-center"> 
                cancel session 
            </span>
          </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};


// SessionProposedDisplay component to display the proposed session
const SessionProposedDisplay: React.FC<SessionProposedDisplayProps> = ({ studentId }) => {
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

  React.useEffect(() => {
    console.log('Session data from cache:', !isValidating);
  }, [isValidating]);

  if (error) return <div>Error loading any session</div>;

  return (
    <Card className={`my-5 ${proposedSession ? 'bg-black shadow-2xl' : ''}`}>
      <CardHeader className=" flex">
        {isValidating ? (
            null
        ) : proposedSession && (
         <div className="flex flex-row items-center space-x-4 mb-4">
            <div className="grow text-white bg-gray-900 p-3 text-sm rounded-md ">
              <h1 className="text-md font-bold"> You have a Proposed Session with the Student. </h1>  
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
            Any proposed sessions will appear here. A session needs to be accepted and confirmed by both Student and Teacher.
          </p>
        ) : (
          <div className="flex flex-col space-y-5">
            <div>
              <p className={` ${proposedSession ? 'text-gray-400' : 'text-gray-500'} text-md`}>
                You have a session of {formatLength(proposedSession.length)} proposed for {format(proposedSession.date, "PPP")}.
                This session will take place {formatDistance(proposedSession.date, new Date(), { addSuffix: true })}.
              </p>
            </div>
            <div>
              <p className="text-gray-400">
                You'll have to wait for the student to accept this lesson request.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <SessionProposal
          key={proposedSession ? proposedSession.id : 'new-session'}
          updateProposed={() => mutate(`fetchProposedSession-${studentId}`)}
          initialSession={proposedSession}
          studentId={studentId}
        />
      </CardFooter>
    </Card>
  );
};

export default SessionProposedDisplay;