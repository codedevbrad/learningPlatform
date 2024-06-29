'use server'
import { db__getAllChallenges, db__addChallenge, db__deleteChallenge, db__editChallenge } from "@/db_queries/challenges/admin.queries"


export async function action__findChallenge ( ) {
    try {

    }
    catch ( error ) {

    }
}

export async function action__getAllChallenges ( ) {
    try {
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