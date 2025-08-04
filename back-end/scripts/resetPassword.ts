import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function resetPassword() {
  try {
    // Replace this with the email you want to reset
    const email = "osohoo691016@gmail.com"; // CHANGE THIS TO YOUR EMAIL
    const newPassword = "password123"; // CHANGE THIS TO YOUR DESIRED PASSWORD (minimum 6 characters)

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    const user = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    console.log("Password reset successfully for:", {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    console.log("New password:", newPassword);
  } catch (error: any) {
    if (error.code === "P2025") {
      console.error("User not found with this email");
    } else {
      console.error("Error resetting password:", error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
