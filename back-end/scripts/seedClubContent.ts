import { prisma } from "../src/utils/prisma";

async function main() {
  // HERO SECTION
  await prisma.clubContent.createMany({
    data: [
      {
        key: "hero_title",
        value: "RedS Клуб",
        type: "text",
        section: "hero",
        order: 1,
      },
      {
        key: "hero_motto",
        value: "Оюун ухаанаа хөгжүүлж, ирээдүйгээ бүтээе!",
        type: "text",
        section: "hero",
        order: 2,
      },
      {
        key: "hero_mission",
        value:
          "Сурагчдын сэтгэхүй, бүтээлч байдал, хамтын ажиллагааг хөгжүүлэх, оюуны спортын соёлыг түгээн дэлгэрүүлэх.",
        type: "text",
        section: "hero",
        order: 3,
      },
      {
        key: "hero_logo",
        value: "/logosalbariin.png",
        type: "image",
        section: "hero",
        order: 4,
      },
      {
        key: "hero_bg_image",
        value: "/about3.png",
        type: "image",
        section: "hero",
        order: 5,
      },
      {
        key: "hero_stat_athletes",
        value: "100+",
        type: "text",
        section: "hero",
        order: 6,
      },
      {
        key: "hero_stat_types",
        value: "6",
        type: "text",
        section: "hero",
        order: 7,
      },
      {
        key: "hero_stat_coaches",
        value: "6+",
        type: "text",
        section: "hero",
        order: 8,
      },
    ],
    skipDuplicates: true,
  });

  // REQUIREMENTS
  await prisma.clubContent.createMany({
    data: [
      {
        key: "requirement_1",
        value: "8-18 насны сурагч байх",
        type: "text",
        section: "requirements",
        order: 1,
      },
      {
        key: "requirement_2",
        value: "Оюуны спорт, сэтгэхүйн тоглоомд сонирхолтой байх",
        type: "text",
        section: "requirements",
        order: 2,
      },
      {
        key: "requirement_3",
        value: "Багаар ажиллах, хамт олны уур амьсгалыг дэмжих хүсэлтэй байх",
        type: "text",
        section: "requirements",
        order: 3,
      },
      {
        key: "requirement_4",
        value: "Сургалт, тэмцээнд идэвхтэй оролцох",
        type: "text",
        section: "requirements",
        order: 4,
      },
    ],
    skipDuplicates: true,
  });

  // ACTIVITIES
  await prisma.clubContent.createMany({
    data: [
      {
        key: "activity_1",
        value: "/about3.png",
        type: "image",
        section: "activities",
        order: 1,
      },
      {
        key: "activity_2",
        value: "/academy.png",
        type: "image",
        section: "activities",
        order: 2,
      },
      {
        key: "activity_3",
        value: "/xyno.jpg",
        type: "image",
        section: "activities",
        order: 3,
      },
    ],
    skipDuplicates: true,
  });

  // TYPES
  await prisma.clubContent.createMany({
    data: [
      {
        key: "type_1",
        value: "/logo.svg",
        type: "image",
        section: "types",
        order: 1,
      },
      {
        key: "type_2",
        value: "/logo.svg",
        type: "image",
        section: "types",
        order: 2,
      },
      {
        key: "type_3",
        value: "/logo.svg",
        type: "image",
        section: "types",
        order: 3,
      },
      {
        key: "type_4",
        value: "/logo.svg",
        type: "image",
        section: "types",
        order: 4,
      },
      {
        key: "type_5",
        value: "/logo.svg",
        type: "image",
        section: "types",
        order: 5,
      },
      {
        key: "type_6",
        value: "/logo.svg",
        type: "image",
        section: "types",
        order: 6,
      },
    ],
    skipDuplicates: true,
  });

  // AWARDS - INTERNATIONAL
  await prisma.clubContent.createMany({
    data: [
      {
        key: "award_intl_1",
        value: "/about3.png",
        type: "image",
        section: "awards_international",
        order: 1,
      },
      {
        key: "award_intl_2",
        value: "/academy.png",
        type: "image",
        section: "awards_international",
        order: 2,
      },
    ],
    skipDuplicates: true,
  });

  // AWARDS - DOMESTIC
  await prisma.clubContent.createMany({
    data: [
      {
        key: "award_dom_1",
        value: "/xyno.jpg",
        type: "image",
        section: "awards_domestic",
        order: 1,
      },
      {
        key: "award_dom_2",
        value: "/logosalbariin.png",
        type: "image",
        section: "awards_domestic",
        order: 2,
      },
    ],
    skipDuplicates: true,
  });

  // TOURNAMENTS SECTION
  await prisma.clubContent.createMany({
    data: [
      {
        key: "tournaments_section_title",
        value: "КЛУБИЙН НЭРЭМЖИТ ТЭМЦЭЭНҮҮД",
        type: "text",
        section: "tournaments",
        order: 0,
      },
      {
        key: "tournaments_section_desc",
        value:
          "Манай клубийн нэрэмжит оюуны спортын тэмцээнүүдийг жил бүр тогтмол зохион байгуулдаг. Эдгээр тэмцээнүүд нь сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх, шинэ авьяастнуудыг нээн илрүүлэх зорилготой.",
        type: "text",
        section: "tournaments",
        order: 1,
      },
      {
        key: "tournament_1",
        value: '"RedS Open" тэмцээн',
        type: "text",
        section: "tournaments",
        order: 2,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ ClubContent seeded with test values.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
