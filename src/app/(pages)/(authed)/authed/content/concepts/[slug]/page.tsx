'use server'
import { findTopicById } from "@/db_queries/concepts/student.queries"
import { fetchUserDataOnTopic } from "@/db_queries/user/queries"
import ConceptTopicMainComponent from "./component"
import NextTopicCard from "./nextTopic"


export default async function Page({ params }: { params: { slug: string } }) {
    
    let topicId = params.slug;
    const topic = await findTopicById( topicId );
    const userData = await fetchUserDataOnTopic( topicId );
    const { id, title, description, data, resources , position } = topic;

    return (
        <div className="h-full flex flex-col">
            <ConceptTopicMainComponent 
                  courseInfo={{ name: title , description , resources }}
                         data={ data } 
                 userProgress={{ progress: userData?.userProgress , notes: userData?.userNotes  }} 
                      topicId={ topicId }
            />
            <NextTopicCard topicPos={ position } />
        </div>
    )
}