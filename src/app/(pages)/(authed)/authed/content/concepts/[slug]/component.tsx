'use client'
import React, {useState} from 'react'
import DividerWithText from '@/app/reusables/layouts/divider'

import ContentHeader from '@/app/reusables/components/templates/client/header/index'
import PlatformContentBlocks , { DataForBuild } from "@/app/reusables/components/render/index"

import { action__updateTopicNotesForUser } from './actions'

import SaveProgressForPageBtn from './savePageProgress/index'

import EmbeddedVideoDisplay from '@/app/reusables/components/resources/resource'

interface InfoProps {
    name: string;
    description: string;
    resources: string;
    position: number;
}


interface DataProps {
    map(arg0: (item: DataForBuild, index: React.Key | null | undefined) => React.JSX.Element): React.ReactNode;
    data: DataForBuild[];
}


const ConceptTopicMainComponent: React.FC<
  { data: DataProps, courseInfo: InfoProps , userProgress: any , topicId: string , topicPos: number }> = (
  { data, courseInfo, userProgress , topicId , topicPos }) => {
    
    const { progress , notes } = userProgress;
    const [ completed , changeCompleted ] = useState( progress );

    const [ displayResource , setResourceDisplay ] = useState({ state: false , url: false });

    function OpenResourceDisplay ( url ) {
        setResourceDisplay({ state: true , url });
    }

    function CloseResourceDisplay ( ) {
        setResourceDisplay({ state: false , url: false })
    }

    const updateTheNotes = async ( notesData: any ) => {
        await action__updateTopicNotesForUser( topicId , notesData )
    }

    return (
        <div className="w-3/5 overflow-x-hidden px-3 flex flex-col min-h-screen relative ">
            { displayResource.state && 
             <EmbeddedVideoDisplay url={ displayResource.url } closeDisplay={ CloseResourceDisplay } />
            }
          
            <div className='flex flex-col flex-1'>
                <ContentHeader 
                    courseInfo={courseInfo} 
                    notes={{ state: notes, updateNotesToDb: updateTheNotes }} 
                    triggerResourceVideoDisplay={ OpenResourceDisplay }
                />
                
                <DividerWithText className="">
                    enjoy the content 🙂
                </DividerWithText>

                <PlatformContentBlocks data={data} isInAdminMode={false} adminTools={null} />
            </div>

            <div className="flex fixed bottom-0 left-0 h-[150px] justify-center p-5 items-center bg-white w-full">
                <SaveProgressForPageBtn topicId={topicId} completedState={completed} updateLocally={changeCompleted} />
            </div>
        </div>
    );
};


export default ConceptTopicMainComponent;