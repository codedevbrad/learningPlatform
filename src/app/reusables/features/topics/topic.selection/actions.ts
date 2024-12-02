// Server action function
'use server';
import { getAllConcepts } from "@/db_queries/concepts/admin.queries";
import prisma from "../../../../../../prisma/client";

export async function ACTION___gettopics() {
    return await prisma.topic.findMany()
}