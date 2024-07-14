import { findTopicById } from "@/db_queries/concepts/student.queries"
import { fetchUserDataOnTopic } from "@/db_queries/user/queries"
import ConceptTopicMainComponent from "./component"

export default async function Page({ params }: { params: { slug: string } }) {
    
    let topicId = params.slug;
    const topic = await findTopicById( topicId );
    const userData = await fetchUserDataOnTopic( topicId );
    const { id, title, description, imgUrl, data, resources } = topic;

    return (
        <div className="h-full flex flex-row">
            <ConceptTopicMainComponent 
                  courseInfo={{ name: title , description , imgUrl, resources }}
                         data={ data } 
                 userProgress={{ progress: userData?.userProgress , notes: userData?.userNotes  }} 
                      topicId={ topicId }
            />
        </div>
    )
}