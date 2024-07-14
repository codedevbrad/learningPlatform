
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from "@/app/reusables/content/title"
import TopicsTable from "./tables/content"

export default function UserRecord ( ) {
    return (
        <div className="bg-white p-5">
            <Title title="Your work 👍" variant="subheading1" noMargin={false} />
            <Tabs defaultValue="topics" className="mt-7" storageKey="userrecord_topics__tabs">
                <TabsList>
                    <TabsTrigger value="topics">
                        Topics
                    </TabsTrigger>
                    <TabsTrigger value="courses">
                        Content
                    </TabsTrigger>
                </TabsList>
                <div className="my-5 mb-11">
                    <TabsContent value="topics">
                        <TopicsTable />
                    </TabsContent> 
                    <TabsContent value="courses">
                        tcourses.
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}