'use client'
import { Button } from "@/components/ui/button"
import { action__updateProgressForUser } from "./action"

interface SaveTopicProgressProps {
    topicId: string;
    completedState: boolean;
    updateLocally: ( completedState: boolean ) => void;
}

export default function SaveProgressForPageBtn ( { topicId, completedState , updateLocally } : SaveTopicProgressProps ) {

    const updateTheProgress = async ( ) => {
        await action__updateProgressForUser( completedState, topicId );
        updateLocally( !completedState );
    }

    return (
        <Button className={`border border-gray-200 rounded-lg p-3 px-6 ${ completedState ? 'bg-black text-white' : 'bg-gray-50 text-black'} hover:bg-black hover:text-white`} 
                  onClick={ () => updateTheProgress() }
        > 
            { completedState ? "i've completed this course" : "not completed" } 
        </Button> 
    )
}