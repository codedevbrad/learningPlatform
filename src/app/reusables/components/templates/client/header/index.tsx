import Title from "../../../../content/title"
import PageWorkExtraExpandable from "./expands"

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
            </div>
            <PageWorkExtraExpandable 
                resources={ courseInfo.resources } 
                notes={ notes }
                triggerResourceVideoDisplay={ triggerResourceVideoDisplay }
            />
        </div>
    )
}