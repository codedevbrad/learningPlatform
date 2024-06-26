import React from 'react'

import ExplanationComponent, { ExplanationProps } from "@/app/reusables/components/blocks/explanation/explanation"
import ExplanationAdminBlock from '../blocks/explanation/explanation.admin'

import QuizComponent, { QuizObjectProps } from '@/app/reusables/components/blocks/quiz/quiz'
import QuizAdminBlock from '../blocks/quiz/quiz.admin'

import CodeSnippetAdminBlock from '../blocks/snippet/snippet.admin'
import CodeSnippetComponent, { CodeSnippetProps } from '../blocks/snippet/snippet'

import ChallengeAdminBlock from '../blocks/challenge/challenge.admin'
import ChallengeComponent, { ChallengeUsageProps } from '@/app/reusables/components/blocks/challenge/challenge'

import TaskAdminBlock from '../blocks/task/task.admin'
import TaskComponent, { TaskProps } from '@/app/reusables/components/blocks/task/task'


import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools'


export type DataForBuild = ExplanationProps | TaskProps | ChallengeUsageProps | QuizObjectProps | CodeSnippetProps;

interface DataChoiceComponentProps {
    dataItem: DataForBuild;
    isInAdminMode: boolean;
    adminTools: () => AdminToolsProps;
    key: React.Key | null | undefined;
    blockIndex: number;
}


const DataChoiceComponent: React.FC<DataChoiceComponentProps> = ({ blockIndex, dataItem, isInAdminMode, adminTools }) => {
    if (isInAdminMode) {
        switch (dataItem.type) {
            case 'explanation':
                return (
                    <ExplanationAdminBlock blockIndex={blockIndex} data={dataItem as ExplanationProps} adminTools={adminTools} />
                );
            case 'quiz':
                return (
                    <QuizAdminBlock blockIndex={blockIndex} data={dataItem as QuizObjectProps} adminTools={adminTools} />
                );
            case 'codeSnippet':
                return (
                    <CodeSnippetAdminBlock blockIndex={blockIndex} data={dataItem as CodeSnippetProps} adminTools={adminTools} />
                );
            case 'challenge':
                return (
                    <ChallengeAdminBlock blockIndex={ blockIndex } data={ dataItem as ChallengeUsageProps } adminTools={adminTools} />
                )
            case 'task':
                return (
                    <TaskAdminBlock blockIndex={ blockIndex } data={ dataItem as TaskProps } adminTools={adminTools} />
                )
            default:
                return <div>Could not render course Item...</div>;
        }
    } 
    else {
        switch (dataItem.type) {
            case 'explanation':
                return <ExplanationComponent data={dataItem as ExplanationProps} />;
            case 'quiz':
                return <QuizComponent data={dataItem as QuizObjectProps} />;
            case 'codeSnippet':
                return <CodeSnippetComponent data={dataItem as CodeSnippetProps} />;
            case 'task':
                return <TaskComponent data={dataItem as TaskProps} />;
            case 'challenge':
                return <ChallengeComponent data={dataItem as ChallengeUsageProps} />;
            case 'task': 
                return <TaskComponent data={ dataItem as TaskProps } />
            default:
                return <div>Could not render course Item...</div>;
        }
    }
}


export default function PlatformContentBlocks({ data, isInAdminMode = false, adminTools }) {
    return (
        <>
            {data.map((item: DataForBuild, index: number) => (
                <div className="my-5" key={index}>
                    <DataChoiceComponent 
                        key={ index } 
                        blockIndex={index} 
                        dataItem={item} 
                        isInAdminMode={isInAdminMode} 
                        adminTools={adminTools} 
                    />
                </div>
            ))}
        </>
    )
}