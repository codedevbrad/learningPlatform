"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Title from "@/app/reusables/content/title"

import ContentTable from "./tables/content"
import CoursesTable from "./tables/courses"

export default function UserRecord ( ) {
    return (
        <div className="bg-white p-5">
            <Title title="Your work 👍" variant="subheading1" />
            <Tabs defaultValue="courses" className="mt-7">
                <TabsList>
                    <TabsTrigger value="courses">
                        Courses
                    </TabsTrigger>
                    <TabsTrigger value="individual">
                        Content
                    </TabsTrigger>
                </TabsList>
                <div className="my-5 mb-11">
                <TabsContent value="courses">
                    <CoursesTable />
                </TabsContent>
                <TabsContent value="individual">
                    <ContentTable />
                </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}