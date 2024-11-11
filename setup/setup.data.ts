import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Remove everything
async function removeEverything(): Promise<void> {
    try {
      console.log('Starting the removal of all data...');
      await removeAllTagAssociations();
      await removeAllTopicsAndConcepts();
      await removeUserMessagesAndSessions();
      await removeAllUserWork();
      await removeAllUsersAndWorkAssociations();
      console.log('All data removed successfully.');
    } catch (error) {
      console.error('Error removing everything:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

// Remove all users and their work associations
async function removeAllUsersAndWorkAssociations(): Promise<void> {
  try {
    await prisma.userDataForTopic.deleteMany({});
    await prisma.sessions.deleteMany({});
    await prisma.messages.deleteMany({});
    await prisma.users.deleteMany({});
    console.log('All users and their work associations removed successfully.');
  } catch (error) {
    console.error('Error removing users and their work associations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Remove all user work
async function removeAllUserWork(): Promise<void> {
  try {
    await prisma.sessions.deleteMany({});
    await prisma.userDataForTopic.deleteMany({});
    await prisma.messages.deleteMany({});
    console.log('All user work removed successfully.');
  } catch (error) {
    console.error('Error removing all user work:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Remove just user messages and sessions
async function removeUserMessagesAndSessions(): Promise<void> {
  try {
    await prisma.messages.deleteMany({});
    await prisma.sessions.deleteMany({});
    console.log('User messages and sessions removed successfully.');
  } catch (error) {
    console.error('Error removing user messages and sessions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Remove all topics and concepts
async function removeAllTopicsAndConcepts(): Promise<void> {
  try {
    await prisma.categoriesConcept.deleteMany({});
    await prisma.languagesTopic.deleteMany({});
    await prisma.topic.deleteMany({});
    await prisma.concepts.deleteMany({});
    console.log('All topics and concepts removed successfully.');
  } catch (error) {
    console.error('Error removing all topics and concepts:', error);
  } finally {
    await prisma.$disconnect();
  }
}


// Remove all tags associations
async function removeAllTagAssociations(): Promise<void> {
  try {
    await prisma.categoriesConcept.deleteMany({});
    await prisma.languagesTopic.deleteMany({});
    await prisma.categoriesChallenge.deleteMany({});
    await prisma.languagesChallenge.deleteMany({});
    console.log('All tag associations removed successfully.');
  } catch (error) {
    console.error('Error removing all tag associations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Type for script arguments
type ScriptArgs = 'entire' | 'usersAll' | 'usersWork' | 'topicsConcepts' | 'usersM&S' | 'tagAssociations';

// Function to run the appropriate script based on the argument passed
async function runScript(firstArg: ScriptArgs): Promise<void> {
  switch (firstArg) {
    case 'entire':
      await removeEverything();
      break;
    case 'usersAll':
      await removeAllUsersAndWorkAssociations();
      break;
    case 'usersWork':
      await removeAllUserWork();
      break;    
    case 'usersM&S':
      await removeUserMessagesAndSessions();
      break;
    case 'topicsConcepts':
      await removeAllTopicsAndConcepts();
      break;
    case 'tagAssociations':
      await removeAllTagAssociations();
      break;
    default:
      console.log('Invalid argument passed. Please provide a valid command.');
  }
}


const firstArg = process.argv[2] as ScriptArgs | undefined;

if (firstArg) {
  runScript(firstArg);
} 
else {
  console.log('No argument provided. Please specify a command.');
}