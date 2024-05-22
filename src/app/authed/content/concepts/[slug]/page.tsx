import { findTopicById } from "@/db_queries/concepts/student.queries"
import ConceptTopicMainComponent from "./component"

export default async function Page({ params }: { params: { slug: string } }) {
    let topicId = params.slug;
    const topic = await findTopicById( topicId );
    const { id, title, description, imgUrl, data, resources } = topic;

    return (
        <div className="h-full flex flex-row">
            <ConceptTopicMainComponent courseInfo={{ name: title , description , imgUrl }} data={ data } />
        </div>
    )
}