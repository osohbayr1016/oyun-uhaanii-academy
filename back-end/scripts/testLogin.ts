import bcrypt from "bcryptjs";
import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function testLogin() {
  try {
    // Test with the email you're trying to log in with
    const email = "osohoo691016@gmail.com"; // CHANGE THIS TO YOUR EMAIL
    const password = "your-current-password"; // CHANGE THIS TO YOUR CURRENT PASSWORD

    console.log("Testing login for:", email);

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        password: true, // We need this to test the password
      },
    });

    if (!user) {
      console.error("User not found");
      return;
    }

    console.log("User found:", {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    });

    // Test password comparison
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isPasswordValid);

    if (isPasswordValid) {
      console.log("✅ Login would be successful");
    } else {
      console.log("❌ Login would fail - password is incorrect");

      // Let's also test with a known working password
      const testPassword = "password123";
      const testResult = await bcrypt.compare(testPassword, user.password);
      console.log("Test with 'password123':", testResult);
    }
  } catch (error) {
    console.error("Error testing login:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
