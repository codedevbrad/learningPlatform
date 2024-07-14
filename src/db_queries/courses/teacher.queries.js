import prisma from '../../../prisma/client'; 
import { currentUser } from '@clerk/nextjs';

/*
  to add - if a tag or belonsto doesnt exist in the db then create one
*/
export async function createCourse ( req , res ) {

    // get current logged userId.
    const { id } = await currentUser();
    if ( !id ) return;

    const { title, description, imageUrl, categoryTags, tagIds, belongsToIds } = req.body;
  
    try {
      const course = await prisma.courses.create({
        data: {
          title,
          description,
          imageUrl,
          categoryTags,
          tagIds,
          belongsToIds,
        },
      });
      res.status(200).json(course);
    } 
    catch (error) {
      console.error("Failed to create course:", error);
      res.status(500).json({ error: "Failed to create course" });
    }
}

// Example for creating a tag at pages/api/tags/create.js
export async function createTag(req, res) {
    const { name } = req.body;
    try {
      const tag = await prisma.tags.create({
        data: { name },
      });
      res.status(200).json(tag);
    } 
    catch (error) {
      res.status(500).json({ error: "Failed to create tag" });
    }
}
  
// Example for creating a BelongsTo entity at pages/api/belongsTo/create.js
export async function createBelongsTo(req, res) {
    const { name } = req.body;
    try {
      const belongsTo = await prisma.belongsTo.create({
        data: { name },
      });
      res.status(200).json(belongsTo);
    } 
    catch (error) {
      res.status(500).json({ error: "Failed to create belongsTo entity" });
    }
}
  