'use server'

import { db__getCalendarOfTutor } from "@/db_queries/calendar/queries/sharable.queries";
import { db__confirmProposedSession, db__getSessions , db__getProposedSession , db__upsertProposedSession } from "@/db_queries/sessions/sharable.queries"


export const action__getCalendarForSession = async ( { studentId } ) => {
    try {
       return await db__getCalendarOfTutor({ studentId })
    }
    catch ( error ) {
        console.error( error );
        throw error;
    }
}


export const action__getSessions = async ( { studentId } ) => {
    try {
       return await db__getSessions({ studentId })
    }
    catch ( error ) {
        console.error( error );
        throw error;
    }
}


export const action__getProposedSession = async ( { studentId } ) => {
    try {
        return await db__getProposedSession( { studentId });
    }
    catch ( error ) {
        console.error( error );
        throw error;
    }
}


export const action__proposeSession = async ( { studentId , sessionData } ) => {
    try {
        console.log( 'checking....', studentId , sessionData );
        return await db__upsertProposedSession({ studentId , sessionData });
    }
    catch ( error ) {
        console.error( error );
        throw error;
    }
}


export const action__acceptProposal = async ( { studentId } ) => {
    try {
        await db__confirmProposedSession({ studentId });
    }
    catch ( error ) {
        console.error( error );
        throw error;
    }
}