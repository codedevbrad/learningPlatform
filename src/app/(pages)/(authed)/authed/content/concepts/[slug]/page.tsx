'use server'
import { findTopicById } from "@/db_queries/concepts/student.queries"
import { fetchUserDataOnTopic } from "@/db_queries/user/queries"
import ConceptTopicMainComponent from "./component"
import NextTopicCard from "./nextTopic"

export default async function Page({ params }: { params: { slug: string } }) {
    
    let topicId = params.slug;
    const topic = await findTopicById( topicId );
    const userData = await fetchUserDataOnTopic( topicId );
    const { id, title, description, data, resources , position, author, postedOn } = topic;

    return (
        <div className="h-full flex flex-col items-center">
            <ConceptTopicMainComponent 
                  pageInfo={{ name: title , description , resources, author , postedOn }}
                         data={ data } 
                 userProgress={{ progress: userData?.userProgress , notes: userData?.userNotes  }} 
                      topicId={ topicId }
            />
            <NextTopicCard topicPos={ position } />
        </div>
    )
}