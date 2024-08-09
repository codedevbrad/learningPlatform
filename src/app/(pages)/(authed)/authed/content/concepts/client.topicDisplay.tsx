'use client'
import { PushSheet, PushSheetHeader, PushSheetTitle, PushSheetTrigger, PushSheetFooter , PushSheetDescription } from "@/components/custom/sheetPush"
import Link from "next/link"
import Title from "@/app/reusables/content/title"


export default function TopicsPushSheetRender ( { conceptTitle , topics } ) {

    return (
        <>
            <div className="flex p-2 rounded-lg justify-center flex-col items-center">
              <Title title={ conceptTitle } variant="subheading2" noMargin={false} />

              <PushSheet side="right">
                    <PushSheetTrigger className="border-white border-2 text-white">
                        Topics
                    </PushSheetTrigger>
                    <PushSheetHeader className={undefined}>
                        <PushSheetTitle className={'text-black my-3'}>
                            { conceptTitle }
                        </PushSheetTitle>
                        <PushSheetDescription className={undefined}>
                            Topics for the { conceptTitle } concept.
                        </PushSheetDescription>
                    </PushSheetHeader>
                    <div className="p-4">
                        <ul>
                            { topics.map((topic, topicIndex) => (
                                <Link href={`/authed/content/concepts/${topic.id}`} className="text-md"> 
                                    <li key={topicIndex} className="px-6 py-4 border border-gray-200 rounded-lg bg-black shadow-md mb-5">                                
                                        <Title title={topic.title} variant="subheading2" noMargin={false} className="text-white"/>
                                        <p className="text-sm text-gray-500 pb-5"> {topic.description} </p>
                                    </li>
                                </Link>
                            ))}
                        </ul> 
                    </div>
                    <PushSheetFooter  className={undefined}>
                        <button onClick={() => console.log("Footer button clicked")}>Footer Button</button>
                    </PushSheetFooter>
                </PushSheet>
            </div>
        </>
    )
}