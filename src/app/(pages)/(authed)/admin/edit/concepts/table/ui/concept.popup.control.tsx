import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { action_DeleteConcept } from "../../actions"
import { ExtendedConcepts } from "../../../../../../../prisma/schema.types"
import { useState } from "react"


interface ConceptControlModalProps {
  conceptId: string; 
  updateTable: (topics: ExtendedConcepts[], message: string) => void;
}


const ConceptControlDropdown: React.FC<ConceptControlModalProps> = ({ updateTable, conceptId , children }) => {

      const [dropdownState, changeDropdownState ] = useState(false);

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
        <DropdownMenu open={ dropdownState } onOpenChange={ changeDropdownState }>
          <DropdownMenuTrigger asChild>
            <Button variant="outline"> ... </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
                Session Control 
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                  { children }
              </DropdownMenuItem> 
              <DropdownMenuItem>
                <span onClick={ () => deleteConcept() }> Delete </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
  }

  export default ConceptControlDropdown;