import Title from "@/app/reusables/content/title"
import { action__getChallengeById } from "../actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChallengePageDataComponent from './tabs/data'



export default async function AdminChallengePage ({ params }: { params: { slug: string } }) {

    let challenge = await action__getChallengeById( params.slug );

    if (!challenge) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="p-5">
                    <Title title="This Challenge does not exist or no longer exists." variant="subheading2" noMargin={false} />
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
                        <ChallengePageDataComponent 
                             challengeTitle={ challenge.title } 
                             challengeId={ challenge.id } 
                             description={ challenge.description }
                             tasks={ challenge.tasks }
                             notes={ challenge.notes }
                        />
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