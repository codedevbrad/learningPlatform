import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { action_DeleteConcept } from "../../actions"
import { ExtendedConcepts } from "../../../../../../../prisma/schema.types"


interface DeleteConceptModalProps {
  conceptId: string; 
  updateTable: (topics: ExtendedConcepts[], message: string) => void;
}


const DeleteConceptModal: React.FC<DeleteConceptModalProps> = ({ updateTable, conceptId }) => {
    const deleteConcept = async ( ) => {
        try {
            let tableData = await action_DeleteConcept( conceptId );
            console.log( tableData );
            updateTable( tableData, 'Successfully deleted cocncept.' );
        }
        catch ( err ) {
            console.error('Failed to add del concept:', err );
        }
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"> ... </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
              Session Control 
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span onClick={ () => deleteConcept() }> Delete </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  export default DeleteConceptModal;