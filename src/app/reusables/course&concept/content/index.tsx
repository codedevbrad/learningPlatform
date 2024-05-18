import React from 'react';
import ExplanationComponent, { ExplanationProps } from "@/app/reusables/components/explanation"
import TaskComponent, { TaskProps } from '@/app/reusables/components/task'
import ChallengeComponent, { ChallengeUsageProps } from '@/app/reusables/components/challenge'
import QuizComponent, { QuizObjectProps } from '@/app/reusables/components/quiz'

export type DataForBuild = ExplanationProps | TaskProps | ChallengeUsageProps | QuizObjectProps;


interface DataChoiceComponentProps {
    dataItem: DataForBuild;
}

  
const DataChoiceComponent: React.FC<DataChoiceComponentProps> = ({ dataItem }) => {
    switch (dataItem.type) {
        case 'explanation':
            // Directly render the explanation component
            return <ExplanationComponent data={ dataItem as ExplanationProps } />;
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

export default function PlatformContentBlocks ({ data } ) {
    return (
        <>
            { data.map((item: DataForBuild, index: React.Key | null | undefined) => (
                <DataChoiceComponent key={index} dataItem={item} />
            ))}   
        </>
    )
}