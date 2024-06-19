'use client'
import React, {useState} from 'react'
import DividerWithText from '@/app/reusables/layouts/divider'

import ContentHeader from '@/app/reusables/components/templates/client/header/index'
import PlatformContentBlocks , { DataForBuild } from "@/app/reusables/components/render/index"

import { action__updateTopicProgressForUser , action__updateTopicNotesForUser } from './actions'

import SaveProgressForPageBtn from './savePageProgress/index'

interface InfoProps {
    name: string;
    description: string;
    imgUrl: string;
    resources: string;
}


interface DataProps {
    map(arg0: (item: DataForBuild, index: React.Key | null | undefined) => React.JSX.Element): React.ReactNode;
    data: DataForBuild[];
}


const ConceptTopicMainComponent: React.FC<{ data: DataProps, courseInfo: InfoProps , userProgress: any , topicId: string }> = ({ 
    data, courseInfo, userProgress , topicId
}) => {
    const { progress , notes } = userProgress;
    const [ completed , changeCompleted ] = useState( progress );

    const updateTheProgress = async ( ) => {
        await action__updateTopicProgressForUser( completed, topicId );
        changeCompleted( !completed );
    }

    const updateTheNotes = async ( notesData ) => {
        await action__updateTopicNotesForUser( topicId , notesData )
    }

    return (
        <div className="w-full overflow-x-hidden px-3">
            <ContentHeader 
                 courseInfo={ courseInfo } 
                 completed={ { state: completed , updateProgressToDb: updateTheProgress } } 
                 notes={ {state: notes , updateNotesToDb: updateTheNotes }} />
            
            <DividerWithText className="">
                enjoy the content 🙂
            </DividerWithText>

            <PlatformContentBlocks data={ data } isInAdminMode={ false } adminTools={ null } />

            <div className="flex fixed bottom-0 left-0 justify-center p-5 my-7 items-center bg-white w-full">
                <SaveProgressForPageBtn topicId={ topicId } completedState={ completed } updateLocally={ changeCompleted }/>
            </div>
        </div>
    );
};


export default ConceptTopicMainComponent;