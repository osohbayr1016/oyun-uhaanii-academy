const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function makeAdmin() {
  try {
    // Update the user to admin role
    const updatedUser = await prisma.user.update({
      where: { email: "admin@admin.com" },
      data: { role: "admin" },
    });

    console.log("User updated to admin:", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
