import React from 'react'

import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools'

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

import EditorViewComponent, { EditorJsProps } from '../blocks/editorJs/editor'
import EditorAdminBlock from '../blocks/editorJs/editor.admin'

import VideoViewComponent, { VideoBlockProps } from '../blocks/video/video'
import VideoAdminBlock from '../blocks/video/admin.video'

import AnimatedCodeChallenge, { AnimatedCodeChallengeProps } from '../blocks/animatedCodeChallenge'
import AnimatedCodeChallengeAdminBlock from '../blocks/animatedCodeChallenge/index.admin'


export type DataForBuild = ExplanationProps | TaskProps | ChallengeUsageProps | QuizObjectProps | CodeSnippetProps | EditorJsProps | VideoBlockProps | AnimatedCodeChallengeProps;


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
            case 'editor':
                return (
                    <EditorAdminBlock blockIndex={ blockIndex } data={ dataItem as EditorJsProps } adminTools={ adminTools } />
                )
            case 'video':
                return (
                    <VideoAdminBlock blockIndex={ blockIndex } data={ dataItem as VideoBlockProps } adminTools={ adminTools }   />
                )
            case 'animatedCodeChallenge':
                return (
                    <AnimatedCodeChallengeAdminBlock blockIndex={ blockIndex } data={ dataItem as AnimatedCodeChallengeProps } adminTools={ adminTools } />
                )
            default:
                return <div>Could not render { dataItem.type } block in Admin ... </div>;
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
                return <TaskComponent data={ dataItem as TaskProps } />;
            case 'editor':
                return <EditorViewComponent data={ dataItem as EditorJsProps } />
            case 'video':
                return <VideoViewComponent data={ dataItem as VideoBlockProps } />
            case 'animatedCodeChallenge':
                return <AnimatedCodeChallenge data={ dataItem as AnimatedCodeChallengeProps } />
            default:
                return <div>Could not render { dataItem.type } block ...</div>;
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