'use server'
import { updateTopicResources } from '@/db_queries/concepts/admin.queries'
import { Prisma } from '@prisma/client';

export const action__getAllResources = ( topicId: any ) => {

}

export const action__editNewResource = async ( topicId: string , resources ) => {
    // send url to /services/scraper/generate
    try {
        console.log( 'resources passed: ', resources )
        return await updateTopicResources( topicId , resources );
    }
    catch ( error ) {
        console.error( error );
        throw error;
    }
}

export const action__deleteResource = ( topicId: any ) => {

}
