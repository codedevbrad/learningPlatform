'use client'
// Import necessary dependencies and functions.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import EditDataComponent from "./admin/data"

export default function AdminPage ({ params }: { params: { slug: string } }) {
  return (
      <div>
          <Tabs defaultValue="Data" className="">
                <TabsList>
                    <TabsTrigger value="Data">
                        Concept work
                    </TabsTrigger>
                    <TabsTrigger value="Resources">
                        Resources
                    </TabsTrigger>
                    <TabsTrigger value="Analytics">
                        Analytics
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Data" className="p-6 border border-gray-200 mt-4 rounded-lg">
                    <EditDataComponent id={ params.slug } />
                </TabsContent>
                <TabsContent value="Resources">
                    Resources
                </TabsContent>
                <TabsContent value="Analytics"> 
                    Analytics
                </TabsContent>
           </Tabs>
      </div>
  )
}
