import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { action_DeleteConcept } from "../../actions"
import { ExtendedConcepts } from "../../../../../../../../../prisma/schema.types"
import { useEffect, useState } from "react"
import EditConceptModal from "./concept.modal.edit"
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog" 


interface AlertDialogComponentProps {
    continueAction: ( ) => void;
    open: boolean;
    onOpenChange: ( state : boolean ) => void;
}

function AlertDialogComponent ({ continueAction, open, onOpenChange }: AlertDialogComponentProps ) {
  return (
      <AlertDialog open={ open } onOpenChange={ onOpenChange }>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className='py-3'>
                      <p> This action cannot be undone. This will permanently delete any relations to the concept. </p>
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className={"bg-black"} onClick={continueAction}>Continue</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
  );
}

interface ConceptControlModalProps {
  conceptId: string; 
  concept: ExtendedConcepts;
  updateTable: (topics: ExtendedConcepts[], message: string) => void;
}


const ConceptControlDropdown: React.FC<ConceptControlModalProps> = ({ concept, updateTable, conceptId }) => {

    const [dropdownState, changeDropdownState ] = useState(false);
    const [conceptModalState , setConceptModalState ] = useState( false );
    const [conceptInEdit, changeConceptInEdit ] = useState<ExtendedConcepts | {}>({});
      
    const [deleteConfirmBox, setdeleteConfirmBoxOpen] = useState(false);

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
        <>  
          <EditConceptModal 
                state={ conceptModalState }
                modalAction={ setConceptModalState } 
                concept={ conceptInEdit } 
                updateTable={ updateTable }
          />

          <AlertDialogComponent continueAction={ deleteConcept } open={deleteConfirmBox} onOpenChange={setdeleteConfirmBoxOpen } />
                  
          <DropdownMenu open={ dropdownState } onOpenChange={ changeDropdownState }>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"> ... </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                  Concept Control 
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                  <DropdownMenuItem onClick={ () => { 
                    changeDropdownState( false );
                    setConceptModalState( true );
                    changeConceptInEdit( concept );
                  }}>
                      Edit
                  </DropdownMenuItem> 
                  <DropdownMenuItem onClick={ () => { changeDropdownState( false ); setdeleteConfirmBoxOpen(true) }}> 
                      Delete 
                  </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
  }

  export default ConceptControlDropdown;