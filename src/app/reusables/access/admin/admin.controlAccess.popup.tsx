'use client'
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { UserStatus } from "@prisma/client"
import { changeStudentStatus } from "@/db_queries/user/admin.queries";


export default function ControlStudentAccessPopup({ studentId, status, rerenderUsers }: { studentId: string; status: string }) {

  // Filter out the current status and map options to lowercase
  const filteredOptions = Object.keys( UserStatus ).filter(option => option.toLowerCase() !== status.toLowerCase());

  async function handleAccessChange ( option : UserStatus ) {
        try {
            await changeStudentStatus({ studentId , status: option });            
            // re sync the other content states.
            await rerenderUsers();
        }
        catch ( error ) {
            console.error( error );
        }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="bg-gray-900 text-white px-3 py-1.5 rounded text-sm cursor-pointer">
          {status.toLowerCase()}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Admin Options for User</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filteredOptions.map((option, index) => (
          <DropdownMenuItem key={index } onClick={ () => handleAccessChange( option.toUpperCase() as UserStatus )  }>
             {option.toLowerCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
