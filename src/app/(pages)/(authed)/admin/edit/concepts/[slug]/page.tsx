import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { action_getTopicById } from "../actions"

import EditDataComponent from "./tabs/data"
import EditResourcesComponent from "./tabs/resources"
import Title from "@/app/reusables/content/title"


export default async function AdminConceptPage ({ params }: { params: { slug: string } }) {

    // need an error boundary around this.

    let topic = await action_getTopicById( params.slug );

    if (!topic) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="p-5">
                    <Title title="This Topic does not exist or no longer exists." variant="subheading2" noMargin={false} />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Tabs defaultValue="Data" className="" storageKey="concept_admin__tab">
                    <TabsList>
                        <TabsTrigger value="Data">
                            Topic work
                        </TabsTrigger>
                        <TabsTrigger value="Resources">
                            Resources
                        </TabsTrigger>
                        <TabsTrigger value="Analytics">
                            Analytics
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="Data" className="p-6 border border-gray-200 mt-4 rounded-lg">
                        <EditDataComponent 
                        topicId={ topic.id } 
                        topicData={ topic.data } 
                        topicInfo={{ 
                            title: topic.title , 
                            description: topic.description  , 
                            languages: topic.languages
                        }} 
                        />
                    </TabsContent>
                    <TabsContent value="Resources">
                        <EditResourcesComponent 
                        topicId={ params.slug } 
                        resources={ topic.resources }
                        />
                    </TabsContent>
                    <TabsContent value="Analytics"> 
                        Analytics
                    </TabsContent>
            </Tabs>
        </div>
    )
}