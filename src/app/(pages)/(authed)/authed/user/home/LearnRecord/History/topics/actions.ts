import { fetchAllTopicsThatHaveUserData } from "@/db_queries/user/queries"

export async function action__fetchTopicsUsersWorkedWith ( ) {
    try {
        return await fetchAllTopicsThatHaveUserData();
    }
    catch ( error )  {
        console.log('error fetching all topics a users worked on');
        throw error;
    }
}