import Link from "next/link"
import { useState, useEffect } from "react"
import { action_getTopicById } from "../../../actions"

import PlatformContentBlocks, { DataForBuild } from "@/app/reusables/components/render"
import { AdminToolsProps } from '@/app/admin/_types/type.adminTools'

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"> Add a new block </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel> Add a new block </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CreateNewDataBlock ( ) {
    return (
      <Button> Add new block </Button>
    )
}

export default function EditDataComponent({ id } : { id : string }) { 
  
    const [conceptData, setConceptData] = useState<any>({}); 
    const [ data , setData ] = useState<DataForBuild[]>([]);

    const updateDataBlock = ( { blockData, blockIndex } : { blockData: DataForBuild , blockIndex: number } ) => {
        // index of block and content
        console.log('updating', data, blockData, blockIndex );
        let arrayCopy = [...data];
        arrayCopy[blockIndex ] = blockData;
        setData( arrayCopy );
    }
  
    // Define a function to fetch topic data.
    const fetchTopicData = async (topicId: string) => {
      try {
        const topic = await action_getTopicById(topicId);
        setConceptData(topic); 
        setData( topic?.data )
      } catch (error) {
        console.error('Failed to fetch topic data:', error);
      }
    };
  
    // UseEffect hook to fetch topic data when component mounts
    useEffect(() => {
      fetchTopicData( id );
    }, []); // Empty dependency array ensures useEffect runs only once when component mounts
  
    return (
      <div className="flex flex-col">

        <div className="flex-1 p-4"> 
            <div key={conceptData.id}>
              <h2>{conceptData.title}</h2>
              <p>{conceptData.description}</p>
            </div>
        </div>

        <div>
            {/* render blocks based on data. */}
            <PlatformContentBlocks data={ data } isInAdminMode={ true } adminTools={{
                updateDataBlock
            } as AdminToolsProps } />
            <div className="flex justify-center my-7">
                <DropdownMenuDemo />
            </div>
        </div>
      </div>
    );
}