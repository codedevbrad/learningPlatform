'use client'
import { Button } from "@/components/ui/button"
import { action__updateProgressForUser } from "./action"

export default function SaveProgressForPageBtn ( { topicId, completedState , updateLocally }) {

    const updateTheProgress = async ( ) => {
        await action__updateProgressForUser( completedState, topicId );
        updateLocally( !completedState );
    }

    return (
        <Button className={`border border-gray-200 rounded-lg p-3 px-6 ${ completedState ? 'bg-black text-white' : ''}`} onClick={ () => updateTheProgress() }> 
            { completedState ? "i've completed this course" : "not completed" } 
        </Button> 
    )
}