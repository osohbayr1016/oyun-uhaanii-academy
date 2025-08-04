import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function checkProductionUsers() {
  try {
    // Check all users in the database
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users in the database:`);

    users.forEach((user) => {
      console.log(`- ${user.email} (${user.name}) - Role: ${user.role}`);
    });

    // Reset passwords for all users to ensure they work in production
    const newPassword = "admin123";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    console.log("\nResetting passwords for all users...");

    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
      console.log(`✅ Reset password for ${user.email}`);
    }

    console.log("\n=== PRODUCTION LOGIN CREDENTIALS ===");
    console.log("All users now have the password: admin123");
    console.log("\nAvailable accounts:");

    users.forEach((user) => {
      console.log(`- Email: ${user.email}`);
      console.log(`  Password: admin123`);
      console.log(`  Role: ${user.role}`);
      console.log("");
    });

    console.log("=== IMPORTANT ===");
    console.log(
      "1. These credentials will work in both development and production"
    );
    console.log(
      "2. Make sure to change these passwords after first login in production"
    );
    console.log(
      "3. The backend server must be restarted after this script runs"
    );
  } catch (error) {
    console.error("Error checking/resetting users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProductionUsers();
