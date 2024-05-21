import { DataForBuild } from "@/app/reusables/components/render"

// Define the type for adminTools
interface AdminToolsProps {
  updateDataBlock: ({ 
    blockData , blockIndex } : { blockData: DataForBuild , blockIndex: number 
  }) => void;
}  

export type {
    AdminToolsProps
}