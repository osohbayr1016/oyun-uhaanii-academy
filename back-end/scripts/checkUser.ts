import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function checkUser() {
  try {
    // Check user details
    const user = await prisma.user.findUnique({
      where: { email: "admin@example.com" },
    });

    if (!user) {
      console.log("User not found!");
      return;
    }

    console.log("User found:");
    console.log(`- ID: ${user.id}`);
    console.log(`- Email: ${user.email}`);
    console.log(`- Name: ${user.name}`);
    console.log(`- Role: ${user.role}`);
    console.log(`- Password hash: ${user.password}`);
    console.log(`- Created: ${user.createdAt}`);

    // Test password validation
    const testPassword = "admin123";
    const isValid = await bcrypt.compare(testPassword, user.password);
    console.log(`\nPassword validation test:`);
    console.log(`- Test password: ${testPassword}`);
    console.log(`- Is valid: ${isValid}`);

    // Test with different password
    const testPassword2 = "wrongpassword";
    const isValid2 = await bcrypt.compare(testPassword2, user.password);
    console.log(`- Test password: ${testPassword2}`);
    console.log(`- Is valid: ${isValid2}`);
  } catch (error) {
    console.error("Error checking user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();
