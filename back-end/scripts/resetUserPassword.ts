import bcrypt from "bcryptjs";
import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function resetUserPassword() {
  try {
    // Reset password for admin@example.com
    const saltRounds = 10;
    const newPassword = "admin123";
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updatedUser = await prisma.user.update({
      where: { email: "admin@example.com" },
      data: { password: hashedPassword },
    });

    console.log("Password reset successful:");
    console.log(`- Email: ${updatedUser.email}`);
    console.log(`- Name: ${updatedUser.name}`);
    console.log(`- Role: ${updatedUser.role}`);
    console.log(`- New Password: ${newPassword}`);

    // Also reset password for minjisoo114@gmail.com
    const updatedUser2 = await prisma.user.update({
      where: { email: "minjisoo114@gmail.com" },
      data: { password: hashedPassword },
    });

    console.log("\nPassword reset successful for second user:");
    console.log(`- Email: ${updatedUser2.email}`);
    console.log(`- Name: ${updatedUser2.name}`);
    console.log(`- Role: ${updatedUser2.role}`);
    console.log(`- New Password: ${newPassword}`);
  } catch (error) {
    console.error("Error resetting password:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetUserPassword();
