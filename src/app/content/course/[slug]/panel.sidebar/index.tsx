import ReusableVideoComponent, { VideoReference } from "@/app/reusables/content/video";
import ReusableArticleCardComponent, { ArticleReference } from "@/app/reusables/content/article";

type CourseReference = VideoReference | ArticleReference;

interface CourseSidebarReferencesTypes {
    references: CourseReference[];
}

// The props type for ReferenceComponent
type ReferenceComponentProps = {
    reference: CourseReference
};

enum ReferenceType {
    Video = 'video',
    Article = 'article',
}


const ReferenceComponent: React.FC< ReferenceComponentProps > = ({ reference }) => {
    switch(reference.type) {
        case ReferenceType.Article:
            return <ReusableArticleCardComponent reference={reference as ArticleReference} />;
        case ReferenceType.Video:
            return <ReusableVideoComponent reference={reference as VideoReference} />;
        default:
            return <div>Error: Unknown reference type</div>;
    }
}

export default function CourseSidebarComponent({ references }: CourseSidebarReferencesTypes) {
    return (
        <div className="flex-grow rounded-xl flex-col ml-3">
            <h2 className="text-lg font-bold">References</h2>
            {references.map((reference, index) => (
                <div key={index} className="my-4 cursor-pointer">
                    <ReferenceComponent reference={ reference } />
                </div>
            ))}
        </div>
    );
}