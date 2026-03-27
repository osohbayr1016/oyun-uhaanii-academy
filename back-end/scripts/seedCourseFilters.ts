import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function seedCourseFilters() {
  try {
    console.log('🌱 Seeding course categories and levels...');

    // Seed course categories
    const categories = [
      { name: 'Урт хугацааны' },
      { name: 'Богино хугацааны' }
    ];

    for (const category of categories) {
      await prisma.courseCategory.upsert({
        where: { name: category.name },
        update: {},
        create: category
      });
      console.log(`✅ Category "${category.name}" seeded`);
    }

    // Seed course levels
    const levels = [
      { name: 'СӨБ-Цэцэрлэг' },
      { name: '1-5-р анги' },
      { name: '6-9-р анги' },
      { name: '10-12-р анги' }
    ];

    for (const level of levels) {
      await prisma.courseLevel.upsert({
        where: { name: level.name },
        update: {},
        create: level
      });
      console.log(`✅ Level "${level.name}" seeded`);
    }

    console.log('🎉 Course filters seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding course filters:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCourseFilters(); 