'use server'
import Title from "@/app/reusables/content/title"
import Link from "next/link"
import { getAllConcepts } from "@/db_queries/concepts/student.queries"


// React component to render the learning path ...
const ConceptsRender = async () => {

  const concepts = await getAllConcepts();
  console.log( 'concepts: ', concepts );

  return (
    <div className="w-full flex flex-wrap -m-2"> 
      { concepts.map((area, index) => (
        <div key={index} className="p-2 w-1/3"> 
          <div className="flex items-start p-2">
            <div>
              <Title title={area.title} variant="subheading2" noMargin={false} />
              <ul>
                { area.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="p-3 border border-gray-200 rounded-lg my-4">
                    <Link href={`/authed/content/concepts/${ topic.id }`} className="text-md">
                        <Title title={topic.title} variant="subheading2" noMargin={false} /> 
                        <p> { topic.description }  </p>  
                    </Link>
                  </li>
                )) }
              </ul>
            </div>
          </div>
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