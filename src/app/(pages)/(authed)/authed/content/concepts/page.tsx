'use server'
import Title from "@/app/reusables/content/title"
import { getAllConcepts } from "@/db_queries/concepts/student.queries"
import TopicsPushSheetRender from "./client.topicDisplay"

// React component to render the learning path ...
const ConceptsRender = async () => {
  const concepts = await getAllConcepts();
  console.log('concepts: ', concepts);

  return (
    <div className="w-full flex flex-nowrap flex-row space-x-3 text-white">
      { concepts.map((area, index) => (
        <div key={index} className="shadow-xl rounded-2xl p-2 w-1/3 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600">
           <TopicsPushSheetRender topics={ area.topics } conceptTitle={ area.title }/>
        </div>
      ))}
    </div>
  );
};


export default async function ConceptsPage ( ) {
    return (
        <main className="flex flex-col items-center p-4">
            <Title title="Concepts" variant="heading" noMargin={false} />
            <div className="my-6 w-full">
                <ConceptsRender />
            </div>
        </main>
    )
}