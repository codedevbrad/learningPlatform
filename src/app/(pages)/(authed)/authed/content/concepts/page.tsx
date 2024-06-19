import Title from "@/app/reusables/content/title"
import Link from "next/link"
import { getAllConcepts } from "@/db_queries/concepts/student.queries"

// React component to render the learning path ...
const ConceptsRender = async () => {

  const concepts = await getAllConcepts();
  console.log( 'concepts: ', concepts );

  return (
    <div className="w-full flex flex-wrap -m-2"> {/* Negative margin for gutters */}
      { concepts.map((area, index) => (
        <div key={index} className="p-2 w-1/3"> {/* Padding for gutters and width for 3 items per row */}
          <div className="flex items-start p-2">
            {/* Adjust height, background, and content as needed */}
            <div>
              <Title title={ area.title } variant="subheading2" />
              <ul>
                { area.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="p-3 border border-gray-200 rounded-lg my-4">
                    <Link href={`/authed/content/concepts/${ topic.id }`} className="text-md">
                        <Title title={ topic.title } variant="subheading2" /> 
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


export default function ConceptsPage ( ) {
    return (
        <main className="flex flex-col items-center p-4">
            <Title title="Concepts" variant="heading" />
            <div className="my-6 w-full">
                <ConceptsRender />
            </div>
        </main>
    )
}