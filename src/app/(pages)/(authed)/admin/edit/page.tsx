import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getAllConcepts } from "@/db_queries/concepts/student.queries";
import ConceptsEditPage from "./(concepts)/table"

export default async function EditPage () {

  let conceptsState = await getAllConcepts();

  return (
        <div>
            <Tabs defaultValue="Concepts" className="">
                <TabsList>
                    <TabsTrigger value="Concepts">
                        Concepts
                    </TabsTrigger>
                    <TabsTrigger value="Courses">
                        Courses
                    </TabsTrigger>
                    <TabsTrigger value="Challenges">
                        Challenges
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Concepts">
                    <ConceptsEditPage conceptsState={ conceptsState } />
                </TabsContent>
                <TabsContent value="Courses">
                    Courses
                </TabsContent>
                <TabsContent value="Challenges"> 
                    challenges
                </TabsContent>
           </Tabs>
        </div>
  )
}
