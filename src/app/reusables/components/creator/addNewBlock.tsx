import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { v4 as uuidv4 } from 'uuid'

import { explanationObject, ExplanationProps } from "@/app/reusables/components/blocks/explanation/explanation"
import { quizObject, QuizObjectProps } from "@/app/reusables/components/blocks/quiz/quiz"
import { codeSnippetObject, CodeSnippetProps } from "@/app/reusables/components/blocks/snippet/snippet"
import { ChallengeComponentObject, ChallengeUsageProps } from "@/app/reusables/components/blocks/challenge/challenge"
import { taskObject, TaskProps } from "@/app/reusables/components/blocks/task/task"
import { editorJsObject, EditorJsProps } from "@/app/reusables/components/blocks/editorJs/editor"
import { videoBlockObject, VideoBlockProps } from "@/app/reusables/components/blocks/video/video"


// create props for UpdateDataBlockProps.
// import { props__AdminTool_UpdateDataBlock } from "@/app/(pages)/(authed)/admin/_types/type.adminTools"

interface addDataToBlockProps {
   type: 'new';
   blockData: ExplanationProps | QuizObjectProps | CodeSnippetProps | ChallengeUsageProps | TaskProps | EditorJsProps | VideoBlockProps;
   blockIndex: number;
}

interface AddNewDataBlockProps {
    addDataToBlock: (props: addDataToBlockProps  ) => void;
}
  

export default function AddNewDataBlock ({ addDataToBlock }: AddNewDataBlockProps ) {

    return (
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <Button variant="outline"> Add a new block </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">

          <DropdownMenuLabel> Add a new block </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>

                  <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                      type: 'new', blockData: {...explanationObject, id: uuidv4() }, blockIndex: 0 
                  }) }>
                    <div> Explanation </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                      type: 'new', blockData: {...quizObject, id: uuidv4() }, blockIndex: 0 
                  }) }>
                    <div> Quiz </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                      type: 'new', blockData: {...codeSnippetObject, id: uuidv4() }, blockIndex: 0 
                  }) }>
                    <div> Code snippet </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                      type: 'new', blockData: {...ChallengeComponentObject, id: uuidv4()} , blockIndex: 0 
                  }) }>
                    <div> Challenge </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                      type: 'new', blockData: {...taskObject, id: uuidv4() }, blockIndex: 0 
                  }) }>
                    <div> Task </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                      type: 'new', blockData: {...editorJsObject, id: uuidv4() }, blockIndex: 0 
                  }) }>
                    <div> EditorJs </div>
                  </DropdownMenuItem>          

                  <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                      type: 'new', blockData: {...videoBlockObject, id: uuidv4() }, blockIndex: 0 
                  }) }>
                    <div> video </div>
                  </DropdownMenuItem>          

          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>
    )
}