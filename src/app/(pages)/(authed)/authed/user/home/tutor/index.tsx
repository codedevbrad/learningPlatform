'use server'
import Title from "@/app/reusables/content/title"
import { Tabs, TabsList, TabsContent , TabsTrigger } from "@/components/ui/tabs"

import SessionsWithProposals from "@/app/reusables/components/sessions"
import MessagesDisplayComponent from "@/app/reusables/components/messages"

import { action__getUserData } from "../actions"

export default async function TutorSessions ( ) {
    
    const { id } = await action__getUserData();

    return (
        <div className="p-5 border flex grow flex-col border-gray-200 rounded-lg mt-4">
            <div className="flex flex-col">
                    <Tabs defaultValue="messages" storageKey="student_studentArea__m&s">
                        <TabsList className="">
                            <TabsTrigger value="messages"> Messages </TabsTrigger>
                            <TabsTrigger value="content"> Sessions </TabsTrigger>
                        </TabsList>
                        <TabsContent value="messages">            
                            <Title variant="heading" title="Messages with Your tutor 🙏" noMargin={false} />                
                            <MessagesDisplayComponent studentId={id} sender={"STUDENT"} />
                        </TabsContent>
                        <TabsContent value="content">
                            <Title variant="heading" title="Sessions with Your tutor 🙏" noMargin={false} />
                            <SessionsWithProposals studentId={ id } userType={"Student"} />
                        </TabsContent>
                    </Tabs>
            </div>
        </div>
    )
}