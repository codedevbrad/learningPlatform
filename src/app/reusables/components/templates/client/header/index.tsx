import Title from "../../../../content/title"
import PageWorkExtraExpandable from "./components/expandable"
import AuthorOf from "./components/authorOf";

interface ContentHeaderType {
    courseInfo: any;
    notes: any;
    triggerResourceVideoDisplay: any;
}

export default function ContentHeader ( { courseInfo , notes , triggerResourceVideoDisplay } : ContentHeaderType ) {
    return (
        <div className="flex flex-row"> 
            <div className="mb-10 flex-grow">
                <Title title={courseInfo.name} variant='heading' noMargin={false} />
                <p> { courseInfo.description } </p>   
                <AuthorOf name="Brad lumber" createdAt={new Date()} avatarUrl={""}/> 
            </div>
            <PageWorkExtraExpandable 
                resources={ courseInfo.resources } 
                notes={ notes }
                triggerResourceVideoDisplay={ triggerResourceVideoDisplay }
            />
        </div>
    )
}