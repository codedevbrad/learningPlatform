import Title from "../../../../content/title"
import PageWorkExtraExpandable from "./expands"
import Image from "next/image"

// describe notes stae and func

export default function ContentHeader ( { courseInfo , notes , triggerResourceVideoDisplay } ) {
    return (
        <div className="flex flex-row"> 

            <div className="w-29 h-24 mr-3">
                { courseInfo.imgUrl ? (
                    <Image src={ courseInfo.imgUrl } alt={courseInfo.name}  className="w-29 h-24 mr-4 rounded-xl" />
                ) : (
                    <div className="h-20 bg-gray-200 rounded-lg flex items-center justify-center px-5"> 
                        Placeholder
                    </div>
                )}
               
            </div>
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