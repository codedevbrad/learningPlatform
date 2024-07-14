const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveTags(tags) {
  return Promise.all(tags.map(tag => {
    return prisma.tag.create({
      data: tag,
    });
  }));
}

async function saveBelongsTo(entities) {
  return Promise.all(entities.map(entity => {
    return prisma.belongsTo.create({
      data: entity,
    });
  }));
}

async function main() {
  // Example tags and belongsTo entities to save
  const tags = [
    { name: 'Javascript' },
    { name: 'ReactJs' },
    { name: 'Typescript'},
    { name: 'TailwindCSS' },
    { name: 'Component Libaries' }
  ];

  const belongsToEntities = [
    { name: 'Frontend dev' },
    { name: 'Backend dev' },
    { name: 'Fullstack dev' }
  ];

  // Saving tags and belongsTo entities
  await saveTags(tags).then(res => console.log('Tags saved:', res));
  await saveBelongsTo(belongsToEntities).then(res => console.log('BelongsTo entities saved:', res));
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
