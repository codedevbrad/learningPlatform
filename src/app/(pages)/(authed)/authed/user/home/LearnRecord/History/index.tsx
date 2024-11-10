
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from "@/app/reusables/content/title"
import TopicsTable from "./topics"

export default function UserHistory ( ) {
    return (
        <div>
            <Title title="Your work 👍" variant="subheading1" noMargin={false} />
            <Tabs defaultValue="topics" className="mt-7" storageKey="userHistory_topics__tabs">
                <TabsList>
                    <TabsTrigger value="topics">
                        Topics
                    </TabsTrigger>
                    <TabsTrigger value="courses">
                        Challenges
                    </TabsTrigger>
                </TabsList>
                <div className="my-5 mb-11">
                    <TabsContent value="topics">
                        <TopicsTable />
                    </TabsContent> 
                    <TabsContent value="courses">
                        Challenges.
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}