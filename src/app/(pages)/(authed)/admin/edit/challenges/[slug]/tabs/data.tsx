'use client'

import Title from "@/app/reusables/content/title"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Editor from "@/app/reusables/usables/editorJs"
import { useState } from "react"

interface ChallengeDataProps {
    description: any;
    tasks: any;
    notes: any;
}

function ChallengData ( { description , notes , tasks } : ChallengeDataProps ) {

    const [ notesState , setNotesState ] = useState({});

    const [ tasksState , setTaskState ] = useState({ });
    
    return (
        <Tabs defaultValue="Description" className="" storageKey="concept_single_admin__tab">
                <TabsList>
                    <TabsTrigger value="Description">
                       Description
                    </TabsTrigger>
                    <TabsTrigger value="Tasks">
                        Tasks
                    </TabsTrigger>
                    <TabsTrigger value="Notes">
                        Notes
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Description" className="p-6 border border-gray-200 mt-4 rounded-lg">
                   Description ...

                </TabsContent>
                <TabsContent value="Tasks" className="p-6 border border-gray-200 mt-4 rounded-lg"> 
                    Tasks ...
                    <Editor 
                         notesMode={ false } 
                         inReadMode={ false } 
                         showSaveButn={ true } 
                         notesMode={undefined} 
                         data={undefined} 
                         onSaveToState={true} 
                         saveByButton={true} 
                    />
                </TabsContent>
                <TabsContent value="Notes" className="p-6 border border-gray-200 mt-4 rounded-lg"> 
                    Notes ...
                </TabsContent>
        </Tabs>
    )
}



interface ChallengePageDataComponentProps {
    challengeId: string;
    challengeTitle: string;
    description: any;
    tasks: any;
    notes: any;
}

export default function ChallengePageDataComponent ( { challengeId, challengeTitle, description, tasks, notes } : ChallengePageDataComponentProps ) {
    return (
        <div className="flex flex-col"> 
            <div className="flex-1 pb-4 flex-row flex justify-between items-center">
                <div key={ challengeId }>
                    <Title variant="heading" title={challengeTitle } noMargin={false} />
                </div>
                <div>
                {/* <DataDisplaySwitch /> */}
                <Link href={`/authed/content/challenges/${challengeId}`} rel="noopener noreferrer" target="_blank">
                    <Button>
                        View page
                    </Button>
                </Link>
                </div>
            </div>
            <div>
                <ChallengData description={ description } tasks={ tasks } notes={ notes } />
            </div>
        </div>
    )
}