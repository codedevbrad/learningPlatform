'use server'
import { db__getAllChallenges, db__addChallenge, db__deleteChallenge, db__editChallenge } from "@/db_queries/challenges/admin.queries"
import { db__getChallengeById } from "@/db_queries/challenges/util.queries"


export async function action__getChallengeById ( challengeId: string ) {
    try {
        return await db__getChallengeById( challengeId );
    }
    catch ( error ) {

    }
}


export async function action__updateChallengeData ( challengeId: string , data ) {
    try {
        // return await db__getChallengeById( challengeId );
    }
    catch ( error ) {

    }
}


export async function action__getAllChallenges ( ) {
    try {
        console.log('fetching challenged from server')
        return await db__getAllChallenges();
    }
    catch ( error ) {
        console.log( 'error fetching all challenges.' , error );
        throw error;
    }
}


export async function action__addChallenge ( challengeObj : {
    title: string , selectedCategories: string[], selectedLanguages: string[]
} ) {
    try {
        return await db__addChallenge( challengeObj );
    }
    catch ( error ) {
        console.log( 'error adding a challenge.' , error );
        throw error;
    }
}


export async function action__editChallenge ( challengeObj: any, challengeId: any ) {
    try {
        return await db__editChallenge({ 
            challengeId, challengeObj
        });
    }
    catch ( error ) {
        console.error( 'error editing challenge.' , error );
        throw error;
    }
}


export async function action__deleteChallenge ( challengeId : string ) {
    try {
        return await db__deleteChallenge( challengeId );
    }
    catch ( error ) {
        console.log( 'error deleting a challenge.' , error );
        throw error;
    }
}