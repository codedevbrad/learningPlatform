import { DataForBuild } from "@/app/reusables/components/render"

interface props__AdminTool_UpdateDataBlock { 
    type: 'new' | 'update' | 'delete', 
    blockData: DataForBuild | null, 
    blockIndex: number 
}

// Define the type for adminTools
interface AdminToolsProps {
  updateDataBlock: ( { type , blockData, blockIndex } : props__AdminTool_UpdateDataBlock ) => void;
}  

export type {
    AdminToolsProps, props__AdminTool_UpdateDataBlock
}