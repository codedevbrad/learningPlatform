import Title from "../../../../content/title"
import CourseExtraExpandable from "./expands"


export default function ContentHeader ( { courseInfo }) {
    return (
        <div className="flex flex-row"> 
            <div>
            <img src={courseInfo.imgUrl} alt={courseInfo.name} className="w-29 h-24 mr-4 rounded-xl" />
            </div>
            <div className="mb-10 flex-grow">
                <Title title={ courseInfo.name } variant='heading' />
                <p> { courseInfo.description } </p>    
            </div>
            <CourseExtraExpandable />
        </div>
    )
}