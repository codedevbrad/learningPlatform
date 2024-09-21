// Import necessary modules
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const {users } = require("@clerk/clerk-sdk-node");

/* setup admin user */
async function createAdminUser() {
  try {
    let test = await prisma.adminUsers.findMany();     
    console.log( test );

    const response = await users.createUser({
      firstName: 'Test',
      lastName: 'User',
      emailAddress: ['testclerk123@gmail.com'],
      password: 'password',
    })

  } 
  catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();