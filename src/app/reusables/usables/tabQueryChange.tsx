'use client'
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { TabsTrigger } from "@/components/ui/tabs"
import { useCallback } from "react"

interface TabQueryChangeProps {
  tabName: string;
}

const TabQueryChange: React.FC<TabQueryChangeProps> = ({ tabName }) => {

  const router = useRouter()
  const pathname = usePathname()
 
  return (
    <TabsTrigger value={tabName} onClick={ () => router.push(`${pathname}?tab=${ tabName }`) }>
      {tabName}
    </TabsTrigger>
  );
}

export default TabQueryChange;2