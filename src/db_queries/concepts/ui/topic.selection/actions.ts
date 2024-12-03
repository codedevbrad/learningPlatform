// Server action function
'use server';
import { getAllConcepts } from "../../admin.queries";
import prisma from "../../../../../prisma/client";

export async function ACTION___gettopics() {
    return await prisma.topic.findMany()
}