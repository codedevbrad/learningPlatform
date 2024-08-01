"use client"

import * as React from "react"
import { format, formatDistance } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useState, useEffect } from "react"
import useSWR, { mutate } from 'swr'

import { action__getProposedSession, action__proposeSession } from "./actions"
import Title from "@/app/reusables/content/title"


interface SessionProposalProps {
    updateProposed: (session: any) => void;
    initialSession?: any;
    studentId: string;
}

const formatLength = (length: number) => {
    const hours = Math.floor(length / 60);
    const minutes = length % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : ''}`;
};


function SessionProposal({ studentId, updateProposed, initialSession }) {
    const [sessionTitle, setSessionTitle] = useState(initialSession?.title || '');
    const [sessionDate, setSessionDate] = useState<Date | undefined>(initialSession?.date);
    const [sessionLength, setSessionLength] = useState(initialSession?.length || 30);
    const [proposalPopupState, changeProposalState] = useState(false);

    useEffect(() => {
        setSessionTitle(initialSession?.title || '');
        setSessionDate(initialSession?.date);
        setSessionLength(initialSession?.length || 30);
    }, [initialSession]);

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
                    studentId
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
                    <div className="flex flex-col space-y-2">
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
                                    onSelect={setSessionDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Length</label>
                        <div className="flex items-center space-x-2 ">
                            <Button variant="outline" onClick={decrementLength}>-</Button>
                            <span className="grow text-center"> { formatLength( sessionLength ) } </span>
                            <Button variant="outline" onClick={incrementLength}>+</Button>
                        </div>
                    </div>
                    <Button onClick={proposeSessionSubmit}>Propose</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default function SessionProposedDisplay({ studentId }) {
    const fetcher = async () => {
        try {
            console.log(`Fetching proposed session for studentId: ${studentId}`);
            const data = await action__getProposedSession({ studentId });
            console.log('Fetched data:', data);
            return data;
        } catch (error) {
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

    if (error) return <div>Error loading any session </div>;

    return (
        <Card className={`my-5 ${proposedSession ? 'bg-black shadow-2xl' : ''}`}>
            <CardHeader className="relative">
                {isValidating ? (
                    <div className="absolute top-3 right-3 text-white bg-gray-900 p-3 text-sm rounded-md">
                        <span>Loading...</span>
                    </div>
                ) : proposedSession && (
                    <div className="text-white bg-gray-900 p-3 text-sm rounded-md mb-5">
                       <Title title={' You have a Proposed Session with Student'} variant="subheading2" noMargin={false} />
                    </div>
                )}
                <CardTitle className={`text-2xl font-semibold ${proposedSession ? 'text-white' : 'text-gray-800'}`}>
                    {isValidating ? 'Loading...' : (proposedSession ? proposedSession.title : 'No proposed sessions')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                { isValidating ? (
                    <p className="text-gray-500 text-md">
                        Loading session details...
                    </p>
                ) : !proposedSession ? (
                    <p className="text-gray-500 text-md">
                        Any proposed sessions will appear here. A session needs to be accepted and confirmed by both Student and Teacher.
                    </p>
                ) : (
                    <div className="flex flex-col space-y-5">
                        <div>
                            <p className={` ${proposedSession ? 'text-gray-400' : 'text-gray-500'} text-md`}>
                                You have a session of { formatLength( proposedSession.length ) } proposed for {format(proposedSession.date, "PPP")}.
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
}