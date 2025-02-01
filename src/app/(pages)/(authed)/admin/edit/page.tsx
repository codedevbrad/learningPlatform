import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"

import ConceptsEditTable from "./concepts/table"
import ChallengesEditTable from "./challenges/table"

import TabQueryChange from "@/app/reusables/usables/tabQueryChange"


export default async function EditContentPage (
    { searchParams }: { searchParams?: { [key: string]: string | string[] | undefined };
}) {

  return (
        <div>
            <Tabs defaultValue={searchParams?.tab || 'concepts' } className="">
                <TabsList>
                    <TabQueryChange tabName={'concepts'} />
                    <TabQueryChange tabName={'challenges'} />
                    <TabQueryChange tabName={'courses'} />
                </TabsList>
                <TabsContent value="concepts">
                    <ConceptsEditTable />
                </TabsContent>

                <TabsContent value="challenges"> 
                    <ChallengesEditTable />
                </TabsContent>    
                            
                <TabsContent value="courses">
                    Courses
                </TabsContent>
           </Tabs>
        </div>
  )
}