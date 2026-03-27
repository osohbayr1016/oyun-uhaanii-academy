import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function checkAndUpdateUserRole() {
  try {
    console.log("🔍 Checking user roles in database...\n");

    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    console.log(`📊 Found ${users.length} users in database:\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Role: "${user.role}" (type: ${typeof user.role})`);
      console.log(`   Created: ${user.createdAt}`);
      console.log("");
    });

    // Check for users without admin role
    const nonAdminUsers = users.filter((user) => user.role !== "admin");
    const adminUsers = users.filter((user) => user.role === "admin");

    console.log(`👑 Admin users: ${adminUsers.length}`);
    adminUsers.forEach((user) => {
      console.log(`   - ${user.name} (${user.email})`);
    });

    console.log(`\n👤 Non-admin users: ${nonAdminUsers.length}`);
    nonAdminUsers.forEach((user) => {
      console.log(`   - ${user.name} (${user.email})`);
    });

    // Ask if user wants to make someone admin
    console.log("\n" + "=".repeat(50));
    console.log("🔧 To make a user admin, run this command:");
    console.log("npm run make-admin <email>");
    console.log("=".repeat(50));
  } catch (error) {
    console.error("❌ Error checking user roles:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Function to make a user admin
async function makeUserAdmin(email: string) {
  try {
    console.log(`🔧 Making user ${email} admin...`);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      return;
    }

    if (user.role === "admin") {
      console.log(`✅ User ${email} is already admin`);
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });

    console.log(`✅ Successfully made ${email} admin`);
    console.log(`   Name: ${updatedUser.name}`);
    console.log(`   Role: ${updatedUser.role}`);
  } catch (error) {
    console.error("❌ Error making user admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length > 0 && args[0] === "make-admin") {
    const email = args[1];
    if (!email) {
      console.log("❌ Please provide an email address");
      console.log("Usage: npm run make-admin <email>");
      process.exit(1);
    }
    makeUserAdmin(email);
  } else {
    checkAndUpdateUserRole();
  }
}

export { checkAndUpdateUserRole, makeUserAdmin };
