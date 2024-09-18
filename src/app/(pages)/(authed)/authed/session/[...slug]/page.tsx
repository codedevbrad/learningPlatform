"use server"

import Title from "@/app/reusables/content/title"
import { action__getSession } from "./action"
import { Card } from "@/components/ui/card"
import Notes from "./components/client.notes"
import { formatDistanceToNow, isBefore, isAfter } from "date-fns"
import DrawCanvas from "@/app/reusables/usables/drawCanvas"

// Check if the app is in test mode
const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true'


const SessionInProgress = ({ session }) => {
 
    // Check session start and end time
    const currentTime = new Date();
    const sessionTime = new Date(session.date);
    const sessionEndTime = new Date(sessionTime.getTime() + session.length * 60000);
    const isExpired = isBefore(sessionEndTime, currentTime); // Check if session has finished
    
    var notes = [
        {
        id: 1,
        content: "Discuss ES6 features like arrow functions and destructuring.",
        createdAt: "2024-08-30T10:00:00Z",
        },
        {
        id: 2,
        content: "Review async/await and promises.",
        createdAt: "2024-08-30T11:00:00Z",
        },
        {
        id: 3,
        content: "Implement a small project using Fetch API.",
        createdAt: "2024-08-30T12:00:00Z",
        },
    ];

    return (
      <Card className="w-5/6 p-7 space-y-5 flex flex-col grow">
            <div className="flex justify-center">
                <Title title={`${session.title} session ${ isExpired ? 'has finished' : 'is in progress!' }` } variant="Heading" noMargin={false} />
                <span className="font-bold text-sm px-3 py-0 rounded-lg bg-blue-100 text-blue-800 justify-center items-center flex ml-3">
                        Web Session
                </span>
            </div>

            <Card className="flex flex-row px-5">
            
                <div className="flex flex-row space-x-5 items-center">
                    <h3 className="font-bold"> 
                        Zoom Link 
                    </h3> 
                    : 
                    <span className="font-bold text-sm p-1 px-4 rounded-lg bg-blue-100 text-blue-800">
                         ab4skskxs_ajsnsns 
                    </span> 
                </div>            
                <div className="grow flex justify-end">
                    <Notes notesButtonText={ 'Craft notes for session'} notes={{}} />
                </div>
            </Card>

            <Card className="px-5 flex flex-col">
                <DrawCanvas title={"Storyboard"} />
            </Card>

            <Card className="p-4">
                <Title title={`Actions for this sessionand after`} variant="subheading1" noMargin={false} />
                <div>
                    { notes.map( ( note , index ) => 
                        <Card className="my-3 p-5" key={ index }> { note.content } </Card>
                    )}
                </div>
            </Card>
            
      </Card>
    );
};


function SessionWaiting ( { session }) {
    return (
        <Card className="w-5/6 p-7">
            <div className="py-5">
                <div className="flex flex-row">
                    <Title className="font-bold" title={session.title} variant="Heading" noMargin={true} />
                    <span className="font-bold text-sm px-3 py-0 rounded-lg bg-blue-100 text-blue-800 justify-center items-center flex ml-3">
                    Web Session
                    </span>
                </div>
            </div>

            <div className="w-full relative p-5">
                <img
                    className="rounded-2xl h-[450px] w-full inset-0 object-cover"
                    src="https://plus.unsplash.com/premium_photo-1682130183027-2df8f6b99162?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="session"
                />
                <div className="w-2/5 px-9 py-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg items-center justify-center flex flex-col p-4">
                        <Title title="Your tutoring session will start" variant="subheading1" noMargin={false} />
                        <span className="text-green-600 bg-green-200 px-3 rounded-md mt-2">
                            <Title
                                title={`Starts in ${formatDistanceToNow(sessionTime, { addSuffix: true })}`}
                                variant="subheading3"
                                noMargin={false}
                            />
                        </span>
                </div>  
                <div className="flex justify-end">
                    <Notes notesButtonText={"Make notes before the session starts"}/>
                </div>
            </div>
        </Card>
    )
}


export default async function Page({ params }: { params: { slug: string } }) {
  // Extract session ID from the params
  let id = params.slug[0];

  // Fetch the session details
  const session = await action__getSession({ sessionId: id });

  // Check session start and end time
  const currentTime = new Date();
  const sessionTime = new Date(session.date);

  // Determine if the session has started, is ongoing, or hasn't started.
  const isUpcoming = isAfter(sessionTime, currentTime);
  // const isInProgress = isBefore(currentTime, sessionEndTime) && isAfter(currentTime, sessionTime);

  return (
    <div className="h-full flex flex-col justify-start items-center pt-11">
      { isUpcoming ? (
            <SessionWaiting session={ session } />
      ) : (
            <SessionInProgress session={session} /> 
      )}
    </div>
  );
}