import Title from "../../../../content/title"
import PageWorkExtraExpandable from "./components/expandable"
import AuthorOf from "./components/authorOf"

interface ContentHeaderType {
    headerInfo: {
        name: string; 
        description: string;
        resources: any;
        author: {
            name: string;
        }
        postedOn: Date;
    }; // Updated from courseInfo to headerInfo
    notes: any;
    triggerResourceVideoDisplay: any;
}


/**
 * ContentHeader component displays the header section of the page, including the title,
 * description, author information, and additional expandable content like resources and notes.
 * 
 * @component
 * 
 * @description
 * The `ContentHeader` component is responsible for rendering the main title, description, author information,
 * and additional expandable content such as resources and notes.
 * 
 * @example
 * // Example usage of ContentHeader
 * const headerInfo = {
 *   name: "React Basics",
 *   description: "Learn the fundamentals of React",
 *   resources: [...], // Array of resource objects
 *   author: { name: "John Doe" }
 *   postedOn: "2024-10-21T16:54:21.475Z"
 * };
 * const notes = [...]; // Array of note objects
 * const triggerVideoFunction = () => { ... };
 * 
 * <ContentHeader 
 *   headerInfo={headerInfo} 
 *   notes={notes} 
 *   triggerResourceVideoDisplay={triggerVideoFunction} 
 * />
*/


export default function ContentHeader({ headerInfo, notes, triggerResourceVideoDisplay }: ContentHeaderType) {
    const { name } = headerInfo.author;
    return (
        <>
            <div className="flex flex-row">
                <div className="mb-10 flex-grow flex flex-row justify-center">
                    <div className="flex flex-col mb-5"> 
                        <Title title={headerInfo.name} variant="heading" noMargin={false} />
                        <p>{headerInfo.description}</p>
                    </div>
                </div>
                <PageWorkExtraExpandable
                    resources={headerInfo.resources}
                    notes={notes}
                    triggerResourceVideoDisplay={triggerResourceVideoDisplay}
                />
            </div>
            <div className="flex justify-center mb-8">
                <AuthorOf name={ name } createdAt={ headerInfo.postedOn } avatarUrl={""} />
            </div>
        </>
    );
}