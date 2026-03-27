import bcrypt from "bcryptjs";
import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function createTestUser() {
  try {
    // Check if any users exist
    const existingUsers = await prisma.user.findMany();
    console.log(`Found ${existingUsers.length} existing users:`);

    if (existingUsers.length > 0) {
      existingUsers.forEach((user) => {
        console.log(`- ${user.email} (${user.name}) - Role: ${user.role}`);
      });
    }

    // Create a test admin user if no users exist
    if (existingUsers.length === 0) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("admin123", saltRounds);

      const testUser = await prisma.user.create({
        data: {
          email: "admin@test.com",
          password: hashedPassword,
          name: "Admin User",
          role: "admin",
        },
      });

      console.log("Created test admin user:");
      console.log(`- Email: ${testUser.email}`);
      console.log(`- Name: ${testUser.name}`);
      console.log(`- Role: ${testUser.role}`);
      console.log("- Password: admin123");
    }

    // Create a regular test user
    const existingRegularUser = await prisma.user.findUnique({
      where: { email: "user@test.com" },
    });

    if (!existingRegularUser) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("user123", saltRounds);

      const regularUser = await prisma.user.create({
        data: {
          email: "user@test.com",
          password: hashedPassword,
          name: "Regular User",
          role: "user",
        },
      });

      console.log("Created test regular user:");
      console.log(`- Email: ${regularUser.email}`);
      console.log(`- Name: ${regularUser.name}`);
      console.log(`- Role: ${regularUser.role}`);
      console.log("- Password: user123");
    } else {
      console.log("Regular test user already exists: user@test.com");
    }
  } catch (error) {
    console.error("Error creating test user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
