import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from "@/app/reusables/content/title"

import UserRecord from "./LearnRecord"
import AboutUser from "./about"
import TutorSessions from "./tutor"

function Tabbed ( ) {
    return (
        <Tabs defaultValue="about" className="">
            <TabsList>
                <TabsTrigger value="about">
                    about you
                </TabsTrigger>
                <TabsTrigger value="record">
                    your record
                </TabsTrigger>
                <TabsTrigger value="tutor">
                    Your tutor
                </TabsTrigger>
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
        </Tabs>
    )
}

export default function LearningPage() {
    return (
        <main className="flex flex-col items-center p-4">
            <Title title="Your Learning centre . . ." variant="heading" />

            <div className="mt-8 w-full max-w-4xl">
                <Tabbed />
            </div>
        </main>
    );
}
