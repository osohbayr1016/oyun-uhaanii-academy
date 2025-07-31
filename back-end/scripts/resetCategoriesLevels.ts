import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetCategoriesLevels() {
  try {
    // Delete all existing categories and levels
    await prisma.courseCategory.deleteMany({});
    await prisma.courseLevel.deleteMany({});

    // Create new categories
    await prisma.courseCategory.createMany({
      data: [{ name: "Богино хугацааны" }, { name: "Урт хугацааны" }],
    });

    // Create new levels
    await prisma.courseLevel.createMany({
      data: [
        { name: "СӨБ-Цэцэрлэг" },
        { name: "1-5-р анги" },
        { name: "6-9-р анги" },
        { name: "10-12-р анги" },
      ],
    });

    console.log("Successfully reset categories and levels to 2 each");
  } catch (error) {
    console.error("Error resetting categories and levels:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetCategoriesLevels();
