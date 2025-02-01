'use server'

import { updateTopicIntro } from "@/db_queries/concepts/admin.queries";

export async function handleImageUpload ( topicId : string , url  : string ) {
    'use server'
    console.log( url );
    // await updateTopicIntro( topicId , url );
}