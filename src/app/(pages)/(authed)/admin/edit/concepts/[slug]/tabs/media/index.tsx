'use server'
import Title from "@/app/reusables/content/title";
import ImageDisplayAndChange from "@/app/services/cloudinary/components/renders/imageChoice"
import { updateTopicIntro } from "@/db_queries/concepts/admin.queries"

export default async function EditMediaIntroComponent ( { topicId , introMedia } ) {

    async function handleImageUpload ( media ) {
        'use server'
        console.log( media );
        await updateTopicIntro(  topicId , media );
    }

    return (
        <div className="flex flex-col w-full h-full justify-center items-center my-4 space-y-5">
            <Title title="Create a Media Upload" noMargin={false} />
            <div className="flex w-3/4 h-[500px]">
                 <ImageDisplayAndChange 
                 media={ introMedia } 
                 isInAdminMode={true} 
                 returnMediaChosen={ handleImageUpload }
                 noHoverNeeded={ true }
                /> 
            </div>
        </div>
    )
}