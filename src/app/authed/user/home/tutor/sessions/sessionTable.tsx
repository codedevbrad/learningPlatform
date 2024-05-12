'use client'
import React from 'react';
import { RiFileTextLine } from 'react-icons/ri'; // Importing FileTextLine icon from React Icons

export default function TutorSessionsTable() {
    const sessionObject = {
        tutor: "Tutor Name",
        student: "Student Name",
        sessions: [
            {
                date: "2024-04-21",
                time: "10:00 AM",
                notes: "Session went well, covered topics A, B, and C",
                sessionDocuments: ["document1.pdf", "document2.pdf"]
            },
            {
                date: "2024-04-28",
                time: "11:00 AM",
                notes: "Reviewed topic D in detail, started on topic E",
                sessionDocuments: ["document3.pdf"]
            },
            // Add more sessions as needed
        ]
    };

    return (
        <div className="flex flex-col items-center grow ml-7">
            <div className="w-full max-w-xl">
                {sessionObject.sessions.map((session, index) => (
                    <div key={index} className="bg-slate-100 rounded-md p-4 mb-4 relative">
                        <p><span className="font-semibold">Date:</span> {session.date}</p>
                        <p><span className="font-semibold">Time:</span> {session.time}</p>
                        <p><span className="font-semibold">Notes:</span> {session.notes}</p>
                        <div className="absolute top-4 right-6">
                          <RiFileTextLine size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
