import bcrypt from "bcryptjs";
import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function main() {
  // Create an admin user
  const password = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password,
      role: "ADMIN",
      isActive: true,
    },
  });

  // Add more users
  await prisma.user.createMany({
    data: [
      {
        name: "User One",
        email: "user1@example.com",
        password,
        role: "USER",
        isActive: true,
      },
      {
        name: "User Two",
        email: "user2@example.com",
        password,
        role: "USER",
        isActive: true,
      },
      {
        name: "User Three",
        email: "user3@example.com",
        password,
        role: "USER",
        isActive: false,
      },
    ],
    skipDuplicates: true,
  });

  // Add sample courses
  await prisma.course.createMany({
    data: [
      {
        title: "Course 1",
        description: "Desc 1",
        content: "...",
        imageUrl: "https://example.com/course1.jpg",
        price: 100,
        currency: "MNT",
        duration: 10,
        level: "beginner",
        category: "cat",
        instructor: "Admin",
        isActive: true,
        youtubeUrl: "https://youtube.com/watch?v=course1",
        backgroundImage: "https://example.com/bg1.jpg",
        sectionImage: "https://example.com/section1.jpg",
        sectionText: "Course 1 section text",
      },
      {
        title: "Course 2",
        description: "Desc 2",
        content: "...",
        imageUrl: "https://example.com/course2.jpg",
        price: 200,
        currency: "MNT",
        duration: 20,
        level: "intermediate",
        category: "cat",
        instructor: "Admin",
        isActive: true,
        youtubeUrl: "https://youtube.com/watch?v=course2",
        backgroundImage: "https://example.com/bg2.jpg",
        sectionImage: "https://example.com/section2.jpg",
        sectionText: "Course 2 section text",
      },
    ],
    skipDuplicates: true,
  });

  // Add sample products
  await prisma.product.createMany({
    data: [
      {
        name: "Product 1",
        description: "Desc 1",
        price: 10,
        currency: "MNT",
        imageUrl: "",
        category: "cat",
        stock: 5,
        materials: [],
        isActive: true,
      },
      {
        name: "Product 2",
        description: "Desc 2",
        price: 20,
        currency: "MNT",
        imageUrl: "",
        category: "cat",
        stock: 10,
        materials: [],
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });

  // Add sample tournaments
  await prisma.tournament.createMany({
    data: [
      {
        title: "Tournament 1",
        description: "Desc 1",
        imageUrl: "",
        startDate: new Date(),
        endDate: new Date(),
        category: "cat",
        status: "upcoming",
      },
      {
        title: "Tournament 2",
        description: "Desc 2",
        imageUrl: "",
        startDate: new Date(),
        endDate: new Date(),
        category: "cat",
        status: "active",
      },
    ],
    skipDuplicates: true,
  });

  // Add sample news
  await prisma.news.createMany({
    data: [
      {
        title: "News 1",
        content: "Content 1",
        authorId:
          (
            await prisma.user.findFirst({
              where: { email: "admin@example.com" },
            })
          )?.id || "",
        publishedAt: new Date(),
      },
      {
        title: "News 2",
        content: "Content 2",
        authorId:
          (
            await prisma.user.findFirst({
              where: { email: "admin@example.com" },
            })
          )?.id || "",
        publishedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  // Add sample activities
  await prisma.activity.createMany({
    data: [
      {
        type: "user",
        action: "created",
        entityId:
          (
            await prisma.user.findFirst({
              where: { email: "user1@example.com" },
            })
          )?.id || "",
        entityName: "User One",
        userId:
          (
            await prisma.user.findFirst({
              where: { email: "admin@example.com" },
            })
          )?.id || "",
        userName: "Admin",
        message: "Шинэ хэрэглэгч бүртгэгдлээ: User One",
      },
      {
        type: "course",
        action: "created",
        entityName: "Course 1",
        userName: "Admin",
        message: "Шинэ сургалт нэмэгдлээ: Course 1",
      },
      {
        type: "product",
        action: "created",
        entityName: "Product 1",
        userName: "Admin",
        message: "Шинэ бүтээгдэхүүн нэмэгдлээ: Product 1",
      },
      {
        type: "news",
        action: "created",
        entityName: "News 1",
        userName: "Admin",
        message: "Шинэ мэдээ нийтлэгдлээ: News 1",
      },
      {
        type: "tournament",
        action: "created",
        entityName: "Tournament 1",
        userName: "Admin",
        message: "Шинэ тэмцээн үүсгэгдлээ: Tournament 1",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.officerSectorStats.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      courses: 12,
      tournaments: 8,
      enrollments: 150,
      teachers: 6,
      products: 10,
      years: 5,
    },
  });

  await prisma.carouselImage.createMany({
    data: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      },
    ],
    skipDuplicates: true,
  });

  console.log(
    "Seeded admin, users, courses, products, tournaments, news, categories, levels, carousel images."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
