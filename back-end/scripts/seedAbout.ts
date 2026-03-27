import { getPrismaForNode } from "../src/utils/nodePrisma";

const prisma = getPrismaForNode();

async function seedAboutPageContent() {
  try {
    console.log("🌱 Seeding About page content...");

    const sections = [
      {
        section: "hero",
        title: "Оюун Ухааны Академи",
        content:
          "Монголын хүүхдүүдэд оюун ухааны тоглоомын ертөнцийг нээж өгөх зорилготой академи. Бид хүүхдүүдийн сэтгэхүй, логик сэтгэлгээ, стратегийн бодолтыг хөгжүүлэхэд анхаардаг.",
        imageUrl: "",
      },
      {
        section: "goals",
        title: "Бидний зорилго",
        content:
          "Бидний үндсэн зорилго бол хүүхэд, залуусын оюуны чадамжийг хөгжүүлж, өөртөө итгэлтэй, бүтээлч, сэтгэлгээ өндөртэй ирээдүйн манлайлагчдыг бэлтгэх юм. Түүнчлэн, Монголын нэрийг дэлхийд гаргах оюуны спортын шилдэг тамирчдыг төлөвшүүлэхэд хувь нэмрээ оруулахыг бид эрхэмлэдэг.",
        imageUrl: "",
      },
      {
        section: "values",
        title: "Бидний үнэт зүйлс",
        content:
          "Чадварлаг боловсрол: Олон улсын аргачлал дээр суурилсан сургалтын хөтөлбөр\nХүүхэд төвтэй хандлага: Хүүхдийн сэтгэл зүйд нийцсэн уур амьсгал, хандлага\nБүтээлч байдал ба шинийг сэтгэхүй: Хүүхдийг өөрөөр нь сэтгэж, хөгжих боломжийг олгох\nХариуцлага ба тууштай байдал: Суралцах үйл явцдаа тууштай ханддаг хандлагыг төлөвшүүлэх\nХамтын өсөлт: Багш, сурагч, эцэг эхийн хамтын оролцоотой хөгжлийн орчин",
        imageUrl: "",
      },
      {
        section: "history",
        title: "Бидний түүх",
        content:
          "Монголын Оюун Ухааны Холбооны албан ёсны салбар болох Officer салбар 2020 онд байгуулагдсан. Үүсгэн байгуулагдсан цагаасаа хойш бид олон зуун хүүхдэд оюуны хөгжил, тархины спортоор дамжуулан өөрийгөө нээх боломжийг олгож, аймаг, дүүргийн болон улсын хэмжээний уралдаан тэмцээнүүдэд амжилттай оролцсон тамирчдыг бэлтгэж ирсэн. Бидний өсөлт, хөгжлийн замнал нь сурагчдын амжилтаар хэмжигддэг бөгөөд өдөр бүр шинэ амжилтын төлөө бид хичээнгүйлэн ажилладаг.",
        imageUrl: "",
      },
      {
        section: "contact",
        title: "Холбоо барих",
        content: "",
        imageUrl: "",
        contactAddress: "БЗД - 16-р хороо, Улаанбаатар 13321",
        contactPhone: "+976 9999 0000",
        contactEmail: "contact@oyun-uhaanii.mn",
        contactHours: "Даваа-Баасан: 9:00-18:00",
      },
    ];

    for (const sectionData of sections) {
      const existing = await prisma.aboutPageContent.findFirst({
        where: { section: sectionData.section },
      });

      if (existing) {
        await prisma.aboutPageContent.update({
          where: { id: existing.id },
          data: sectionData,
        });
        console.log(`✅ Updated ${sectionData.section} section`);
      } else {
        await prisma.aboutPageContent.create({
          data: sectionData,
        });
        console.log(`✅ Created ${sectionData.section} section`);
      }
    }

    console.log("🎉 About page content seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding about page content:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedAboutPageContent();
