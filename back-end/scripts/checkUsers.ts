import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    console.log("Existing users in database:");
    console.table(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
