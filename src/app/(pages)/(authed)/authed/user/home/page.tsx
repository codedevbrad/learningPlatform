import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from "@/app/reusables/content/title"

import AboutUser from "./about"
import UserRecord from "./LearnRecord"
import TutorSessions from "./tutor"
import Learn from "./learning"

function Tabbed ( ) {
    return (
        <Tabs defaultValue="tutor" storageKey="user_learning__tabs">
            <TabsList>
                <TabsTrigger value="about">   about you   </TabsTrigger>
                <TabsTrigger value="record">  your record </TabsTrigger>
                <TabsTrigger value="tutor">   Your tutor  </TabsTrigger>
                <TabsTrigger value="learn">   Learning    </TabsTrigger>
            </TabsList>
            <TabsContent value="about">
                <AboutUser />
            </TabsContent>
            <TabsContent value="record">
                <UserRecord />
            </TabsContent>
            <TabsContent value="tutor"> 
                <TutorSessions />
            </TabsContent>
            <TabsContent value="learn"> 
                <Learn />
            </TabsContent>
        </Tabs>
    )
}

export default function LearningPage() {
    return (
        <main className="flex flex-col p-4 items-center">
            <Title title="Your Learning centre . . ." variant="heading" noMargin={false} />
            <div className="mt-8 w-full ">
                <Tabbed />
            </div>
        </main>
    );
}
