'use client'
import { USER_ENUMS } from "@/app/data"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

/*
  
*/

export default function ControlStudentAccessPopup({ status }: { status: string }) {

  // Filter out the current status and map options to lowercase
  const filteredOptions = USER_ENUMS.filter(option => option.toLowerCase() !== status.toLowerCase());

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
          <DropdownMenuItem key={index}>
            {option.toLowerCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
