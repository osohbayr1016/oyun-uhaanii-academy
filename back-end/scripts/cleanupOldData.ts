import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function cleanupOldData() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90); // 90 days ago

  // Delete old notifications
  const deletedNotifications = await prisma.notification.deleteMany({
    where: {
      createdAt: { lt: cutoff },
    },
  });

  // Delete old activities
  const deletedActivities = await prisma.activity.deleteMany({
    where: {
      createdAt: { lt: cutoff },
    },
  });

  console.log(
    `Deleted ${deletedNotifications.count} notifications and ${deletedActivities.count} activities older than 90 days.`
  );
}

cleanupOldData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
