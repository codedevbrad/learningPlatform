'use server'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import MessagesTabContent from "./messages"
import TutoringTabContent from "./tutoring"

export default async function StudentTabsArea({ params }) {
    // Extract student id (slug) from params
    const { slug } = params;
    
    return (
        <div className="flex-1 flex flex-col border-l border-gray-200 p-4">
            <Tabs storageKey="studentArea__tabs" className="flex flex-col h-full">
                <TabsList className="flex flex-row justify-start">
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="tutoring">Tutoring</TabsTrigger>
                </TabsList>
                <MessagesTabContent studentId={slug} />
                <TutoringTabContent studentId={slug} />
            </Tabs>
        </div>
    );
}