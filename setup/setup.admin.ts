// Import necessary modules
const { PrismaClient } = require('@prisma/client');
const { users } = require('@clerk/clerk-sdk-node'); // Optional, only if you need to create Clerk users
const chalk = require('chalk'); // Import chalk for styled console output

const prisma = new PrismaClient();

// Function to create both a user and an admin
async function createUserAndAdmin(userId) {
  try {
    // Check if the admin already exists in the AdminUsers table
    const existingAdmin = await prisma.adminUsers.findUnique({
      where: { userId },
    });

    if (existingAdmin) {
      console.log(chalk.yellow(`⚠️  userId ${userId} already exists as admin.`));
    } else {
      // Create a new admin in the database
      await prisma.adminUsers.create({
        data: {
          userId,
          role: 'ADMIN',
        },
      });

      console.log(chalk.green(`✅ Admin user with userId ${userId} created successfully.`));
    }

    console.log(chalk.blue(`📝 Successfully handled admin creation from userId ${userId}.`));
  } catch (error) {
    console.error(chalk.red('❌ Error creating admin:', error));
  } finally {
    await prisma.$disconnect();
  }
}

// Get the userId argument passed from the command line
const userIdArg = process.argv[2];

// Check if the userId argument is provided
if (!userIdArg) {
  console.log(chalk.red('❌ No userId provided. Please provide a userId to create a new admin.'));
} else {
  createUserAndAdmin(userIdArg);
}
