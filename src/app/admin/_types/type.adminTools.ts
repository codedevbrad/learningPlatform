import { DataForBuild } from "@/app/reusables/components/render"

// Define the type for adminTools
interface AdminToolsProps {
  updateDataBlock: ({ 
    type, blockData , blockIndex } : { type: string, blockData: DataForBuild , blockIndex: number 
  }) => void;
}  

export type {
    AdminToolsProps
}