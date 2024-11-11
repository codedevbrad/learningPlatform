import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from 'uuid'

import { explanationObject } from "@/app/reusables/components/blocks/explanation/explanation"
import { quizObject } from "@/app/reusables/components/blocks/quiz/quiz"
import { codeSnippetObject } from "@/app/reusables/components/blocks/snippet/snippet"
import { ChallengeComponentObject } from "@/app/reusables/components/blocks/challenge/challenge"
import { taskObject } from "@/app/reusables/components/blocks/task/task"
import { editorJsObject } from "@/app/reusables/components/blocks/editorJs/editor"
import { videoBlockObject } from "@/app/reusables/components/blocks/video/video"
import { animatedCodeChallengeObject } from "../blocks/animatedCodeChallenge"
import { imageObject } from "../blocks/image/image"
import { diagramCompletionObject } from "../blocks/diagramCompletion/diagramCompletion"

import { DataForBuild } from "../render"


interface addDataToBlockProps {
   type: 'new';
   blockData: DataForBuild;
   blockIndex?: number;
}


interface DropdownBlockItemProps {
    addDataToBlock: (props: addDataToBlockProps) => void;
    title: string;
    icon: string;
    object: DataForBuild;
    pushAfter: number;
}


function DropdownBlockItem({ addDataToBlock, title, icon, object , pushAfter }: DropdownBlockItemProps,  ) {
    return (
        <DropdownMenuItem className="cursor-pointer" onClick={() => addDataToBlock({
            type: 'new', 
            blockData: { ...object, id: uuidv4() } , 
            blockIndex: pushAfter
        })}>
            <div className="flex flex-row p-4 w-full space-x-3">
                <div className="flex items-center justify-center">
                    {title} 
                </div>
            </div>
        </DropdownMenuItem>
    );
}

interface AddNewDataBlockProps {
    addDataToBlock: any;
    pushAfter: number;
}   


export default function AddNewDataBlock({ addDataToBlock , pushAfter }: AddNewDataBlockProps ) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"> Add a new block </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="h-[600px] overflow-y-scroll">
                <DropdownMenuLabel>Add a new block  </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {[
                        { title: "Explanation", icon: "📄", object: explanationObject },
                        { title: "Image", icon: "🖼️", object: imageObject },
                        { title: "Quiz", icon: "❓", object: quizObject },
                        { title: "Code Snippet", icon: "💻", object: codeSnippetObject },
                        { title: "Challenge", icon: "🏆", object: ChallengeComponentObject },
                        { title: "Task", icon: "📝", object: taskObject },
                        { title: "EditorJs", icon: "✏️", object: editorJsObject },
                        { title: "Video", icon: "🎥", object: videoBlockObject },
                        { title: "Animated Code Challenge", icon: "🚀", object: animatedCodeChallengeObject },
                        { title: "Diagram completion", icon: "💻", object: diagramCompletionObject }
                    ].map((block, index) => (
                        <DropdownBlockItem 
                            key={index} 
                            addDataToBlock={addDataToBlock} 
                            title={block.title} 
                            icon={block.icon} 
                            object={block.object} 
                            pushAfter={pushAfter} 
                        />
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
