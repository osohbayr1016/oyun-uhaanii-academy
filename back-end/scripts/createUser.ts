import bcrypt from "bcryptjs";
import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function createUser() {
  try {
    // Replace these with your actual email and password
    const email = "your-email@example.com"; // CHANGE THIS
    const password = "your-password"; // CHANGE THIS (minimum 6 characters)
    const name = "Your Name"; // CHANGE THIS

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "user", // or "admin" if you want admin privileges
        isActive: true,
      },
    });

    console.log("User created successfully:", {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      console.error("User with this email already exists");
    } else {
      console.error("Error creating user:", error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
