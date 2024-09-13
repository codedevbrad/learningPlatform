import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';

import { explanationObject, ExplanationProps } from "@/app/reusables/components/blocks/explanation/explanation";
import { quizObject, QuizObjectProps } from "@/app/reusables/components/blocks/quiz/quiz";
import { codeSnippetObject, CodeSnippetProps } from "@/app/reusables/components/blocks/snippet/snippet";
import { ChallengeComponentObject, ChallengeUsageProps } from "@/app/reusables/components/blocks/challenge/challenge";
import { taskObject, TaskProps } from "@/app/reusables/components/blocks/task/task";
import { editorJsObject, EditorJsProps } from "@/app/reusables/components/blocks/editorJs/editor";
import { videoBlockObject, VideoBlockProps } from "@/app/reusables/components/blocks/video/video";
import { animatedCodeChallengeObject, AnimatedCodeChallengeProps } from "../blocks/animatedCodeChallenge";
import { imageObject, ImageBlockProps } from "../blocks/image/image";

interface addDataToBlockProps {
   type: 'new';
   blockData: ExplanationProps | QuizObjectProps | CodeSnippetProps | ChallengeUsageProps | TaskProps | EditorJsProps | VideoBlockProps | AnimatedCodeChallengeProps | ImageBlockProps;
   blockIndex: number;
}

interface AddNewDataBlockProps {
    addDataToBlock: (props: addDataToBlockProps) => void;
}

function DropdownBlockItem({ addDataToBlock, title, icon, object }) {
    return (
        <DropdownMenuItem className="cursor-pointer" onClick={() => addDataToBlock({
            type: 'new', blockData: { ...object, id: uuidv4() }, blockIndex: 0
        })}>
            <div className="flex flex-row p-4 w-full space-x-3">
                <div className="px-4 flex items-center justify-center">
                    <div className="bg-gray-50 p-2 rounded-md">
                        <span> {icon} </span>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    {title}
                </div>
            </div>
        </DropdownMenuItem>
    );
}

export default function AddNewDataBlock({ addDataToBlock }: AddNewDataBlockProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Add a new block</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="h-[600px] overflow-y-scroll">
                <DropdownMenuLabel>Add a new block</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownBlockItem title="Explanation" icon={'📄'} addDataToBlock={addDataToBlock} object={explanationObject} />
                    <DropdownBlockItem title="Image" icon={'🖼️'} addDataToBlock={addDataToBlock} object={imageObject} />
                    <DropdownBlockItem title="Quiz" icon={'❓'} addDataToBlock={addDataToBlock} object={quizObject} />
                    <DropdownBlockItem title="Code Snippet" icon={'💻'} addDataToBlock={addDataToBlock} object={codeSnippetObject} />
                    <DropdownBlockItem title="Challenge" icon={'🏆'} addDataToBlock={addDataToBlock} object={ChallengeComponentObject} />
                    <DropdownBlockItem title="Task" icon={'📝'} addDataToBlock={addDataToBlock} object={taskObject} />
                    <DropdownBlockItem title="EditorJs" icon={'✏️'} addDataToBlock={addDataToBlock} object={editorJsObject} />
                    <DropdownBlockItem title="Video" icon={'🎥'} addDataToBlock={addDataToBlock} object={videoBlockObject} />
                    <DropdownBlockItem title="Animated Code Challenge" icon={'🚀'} addDataToBlock={addDataToBlock} object={animatedCodeChallengeObject} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
