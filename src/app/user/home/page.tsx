import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from "@/app/reusables/content/title"

import UserRecord from "./LearnRecord";

export default function LearningPage() {
    return (
        <main className="flex flex-col items-center p-4">
            <Title title="Your Learning centre . . ." variant="heading" />

            <div className="mt-8 w-full max-w-4xl">
                <UserRecord />
            </div>
        </main>
    );
}
