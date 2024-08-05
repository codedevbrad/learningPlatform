import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { action_deleteTopic } from "../../actions"
import { ExtendedConcepts } from "../../../../../../../../../prisma/schema.types"


interface TopicModalProps {
  topicId: string; 
  updateTable: (topics: ExtendedConcepts[], message: string) => void;
}


const TopicControlModal: React.FC<TopicModalProps> = ({ updateTable, topicId }) => {
    const deleteTopic = async ( ) => {
        try {
           console.log('deleting')
            let tableData = await action_deleteTopic( topicId );
            console.log( tableData );
            updateTable( tableData, 'Successfully deleted topic' );
        }
        catch ( err ) {
            console.error('Failed to add new topic:', err );
        }
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"> ... </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
              Topic Control 
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={ () => deleteTopic() }>
              <span> Delete </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  export default TopicControlModal;