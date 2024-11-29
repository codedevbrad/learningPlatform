'use server'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import MessagesTabContent from "./messages"
import OverViewTabContent from "./overview"

import SessionsWithProposals from "@/app/reusables/components/sessions"
import ControlStudentAccess from "@/app/reusables/access/admin/admin.controlAccess"
import AdminHomework from "@/app/reusables/features/homework/render.admin"

export default async function StudentTabsArea({ params }) {
    // Extract student id (slug) from params...
    const { slug } = params;

    return (
        <div className="flex-1 flex flex-col border-l border-gray-200 p-4">
            
            <ControlStudentAccess userId={ slug }/> 

            <Tabs storageKey="studentArea__tabs" className="flex flex-col h-full" defaultValue="overview">
                <TabsList className="flex flex-row justify-start">
                    <TabsTrigger value="overview"> Overview </TabsTrigger>
                    <TabsTrigger value="messages"> Messages </TabsTrigger>
                    <TabsTrigger value="tutoring"> Tutoring </TabsTrigger>
                    <TabsTrigger value="homework"> Homework </TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                     <OverViewTabContent />
                </TabsContent>
                <TabsContent value="messages"> 
                    <MessagesTabContent studentId={slug} />
                </TabsContent>
                <TabsContent value="tutoring">
                    <SessionsWithProposals studentId={slug} userType="Teacher" />
                </TabsContent>
                <TabsContent value="homework">
                    <AdminHomework />
                </TabsContent>
            </Tabs>
        </div>
    );
}