import React from 'react'

import ExplanationComponent, { ExplanationProps } from "@/app/reusables/components/blocks/explanation/explanation"
import ExplanationAdminBlock from '../blocks/explanation/explanation.admin'

import TaskComponent, { TaskProps } from '@/app/reusables/components/blocks/task/task'
import ChallengeComponent, { ChallengeUsageProps } from '@/app/reusables/components/blocks/challenge/challenge'
import QuizComponent, { QuizObjectProps } from '@/app/reusables/components/blocks/quiz/quiz'

import { AdminToolsProps } from '@/app/admin/_types/type.adminTools'


export type DataForBuild = ExplanationProps | TaskProps | ChallengeUsageProps | QuizObjectProps


interface DataChoiceComponentProps {
    dataItem: DataForBuild;
    isInAdminMode: boolean;
    adminTools: ( ) => AdminToolsProps;
    key: React.Key | null | undefined;
    blockIndex: number;
}
  
const DataChoiceComponent: React.FC<DataChoiceComponentProps> = ({ blockIndex, dataItem , isInAdminMode, adminTools }) => {

    switch (dataItem.type) {
        case 'explanation':
            return (
                <>
                    { isInAdminMode ? 
                        <ExplanationAdminBlock blockIndex={ blockIndex } data={ dataItem as ExplanationProps } adminTools={ adminTools } /> : 
                        <ExplanationComponent data={ dataItem as ExplanationProps } /> 
                    }
                </>
            );
        case 'task':
            // Render the task component, passing the entire task object
            return <TaskComponent projectTask={ dataItem as TaskProps } />;
        case 'challenge':
            return <ChallengeComponent data={ dataItem as ChallengeUsageProps } />
        case 'quiz':
            return <QuizComponent data={ dataItem as QuizObjectProps } />
        default:
            // This should never happen, but it's good to handle unexpected cases ...
            return <div> Could not render course Item... </div>
    }
}

export default function PlatformContentBlocks ({ data , isInAdminMode = false, adminTools } ) {
    return (
        <>
            { data.map((item: DataForBuild, index: number ) => (
                <DataChoiceComponent key={index} blockIndex={ index } dataItem={item} isInAdminMode={ isInAdminMode } adminTools={ adminTools } />
            ))}   
        </>
    )
}