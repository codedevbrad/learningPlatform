import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { explanationObject } from "@/app/reusables/components/blocks/explanation/explanation"
import { quizObject } from "@/app/reusables/components/blocks/quiz/quiz"
import { codeSnippetObject } from "@/app/reusables/components/blocks/snippet/snippet"

import { UpdateDataBlockProps } from "."


interface AddNewDataBlockProps {
    addDataToBlock: (props: UpdateDataBlockProps) => void;
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
                  type: 'new', blockData: explanationObject, blockIndex: 0 
              }) }>
                <div> Explanation </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                  type: 'new', blockData: quizObject, blockIndex: 0 
              }) }>
                <div> Quiz </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={ ( ) => addDataToBlock({ 
                  type: 'new', blockData: codeSnippetObject, blockIndex: 0 
              }) }>
                <div> Code snippet </div>
              </DropdownMenuItem>

          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}