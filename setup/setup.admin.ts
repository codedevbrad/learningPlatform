// Import necessary modules
const { PrismaClient } = require('@prisma/client');
const { users } = require('@clerk/clerk-sdk-node'); // Optional, only if you need to create Clerk users
const chalk = require('chalk'); // Import chalk for styled console output

const prisma = new PrismaClient();

// Function to create both a user and an admin
async function createUserAndAdmin({ userId, nickname }) {
  try {
    // Attempt to find the user in the Users table
    const existingUser = await prisma.users.findUnique({
      where: { userId },
    });

    if (!existingUser) {
      console.log(chalk.red(`❌ userId ${userId} does not exist in the Users table. Cannot create admin.`));
      return; // Exit the function if the user does not exist
    }

    // Check if the admin already exists in the AdminUsers table
    const existingAdmin = await prisma.adminUsers.findUnique({
      where: { userId },
    });

    if (existingAdmin) {
      console.log(chalk.yellow(`⚠️  userId ${userId} already exists as admin.`));
    } else {
      // Create a new admin in the database with the provided nickname
      await prisma.adminUsers.create({
        data: {
          userId,
          role: 'ADMIN',
          name: nickname,
        },
      });

      console.log(chalk.green(`✅ Admin user with userId ${userId} and nickname ${nickname} created successfully.`));
    }

    console.log(chalk.blue(`📝 Successfully handled admin creation for userId ${userId} with nickname ${nickname}.`));
  } catch (error) {
    // Check for a specific error related to invalid userId format
    if (error.code === 'P2023') { // Adjust error code if Prisma provides a specific one for format issues
      console.log(chalk.red(`❌ Invalid userId format: ${userId}. Please provide a valid userId.`));
    } 
    else {
      console.error(chalk.red('❌ Error creating admin:', error));
    }
  } 
  finally {
    await prisma.$disconnect();
  }
}

// Get the userId and nickname arguments passed from the command line
const userIdArg = process.argv[2];
const nicknameArg = process.argv[3]; // Get the second argument as nickname

// Check if both userId and nickname arguments are provided
if (!userIdArg || !nicknameArg) {
  console.log(chalk.red('❌ Please provide both a userId and a nickname to create a new admin.'));
} 
else {
  createUserAndAdmin({ userId: userIdArg, nickname: nicknameArg });
}