import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAboutPageContent = async (req: Request, res: Response) => {
  try {
    const content = await prisma.aboutPageContent.findMany({
      orderBy: { createdAt: "asc" },
    });

    // Transform the data into a more usable format
    const formattedContent: any = {};
    content.forEach((item) => {
      if (item.section === "team") {
        formattedContent[item.section] = {
          id: item.id,
          teamMembers: item.teamMembers || [],
        };
      } else {
        formattedContent[item.section] = {
          id: item.id,
          title: item.title,
          content: item.content,
          imageUrl: item.imageUrl,
          teamMemberName: item.teamMemberName,
          teamMemberRole: item.teamMemberRole,
          teamMemberImage: item.teamMemberImage,
          contactAddress: item.contactAddress,
          contactPhone: item.contactPhone,
          contactEmail: item.contactEmail,
          contactHours: item.contactHours,
        };
      }
    });

    res.json(formattedContent);
  } catch (error) {
    console.error("Get about page content error:", error);
    res.status(500).json({ message: "Failed to fetch about page content" });
  }
};

export const updateAboutPageContent = async (req: Request, res: Response) => {
  try {
    const {
      section,
      title,
      content,
      imageUrl,
      teamMembers,
      teamMemberName,
      teamMemberRole,
      teamMemberImage,
      contactAddress,
      contactPhone,
      contactEmail,
      contactHours,
    } = req.body;

    if (!section) {
      return res.status(400).json({ message: "Section is required" });
    }

    // Check if content exists for this section
    const existingContent = await prisma.aboutPageContent.findUnique({
      where: { section },
    });

    let result;
    if (existingContent) {
      // Update existing content
      result = await prisma.aboutPageContent.update({
        where: { section },
        data:
          section === "team"
            ? { teamMembers }
            : {
                title,
                content,
                imageUrl,
                teamMemberName,
                teamMemberRole,
                teamMemberImage,
                contactAddress,
                contactPhone,
                contactEmail,
                contactHours,
              },
      });
    } else {
      // Create new content
      result = await prisma.aboutPageContent.create({
        data:
          section === "team"
            ? { section, teamMembers }
            : {
                section,
                title,
                content,
                imageUrl,
                teamMemberName,
                teamMemberRole,
                teamMemberImage,
                contactAddress,
                contactPhone,
                contactEmail,
                contactHours,
              },
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Update about page content error:", error);
    res.status(500).json({ message: "Failed to update about page content" });
  }
};

export const deleteAboutPageContent = async (req: Request, res: Response) => {
  try {
    const { section } = req.params;

    await prisma.aboutPageContent.delete({
      where: { section },
    });

    res.json({ message: "About page content deleted successfully" });
  } catch (error) {
    console.error("Delete about page content error:", error);
    res.status(500).json({ message: "Failed to delete about page content" });
  }
};

export const seedAboutPageContent = async (req: Request, res: Response) => {
  try {
    const defaultContent = [
      {
        section: "hero",
        title: "Бидний тухай",
        content:
          "Монголын Оюун Ухааны Холбооны Officer салбар нь хүүхэд, өсвөр үеийнхний сэтгэн бодох чадвар, анхаарал төвлөрөл, ой тогтоолтыг хөгжүүлэхэд чиглэсэн мэргэжлийн сургалтуудыг санал болгодог.",
        imageUrl: "/placeholder-about.jpg",
      },
      {
        section: "goals",
        title: "Бидний зорилго",
        content:
          "Бидний үндсэн зорилго бол хүүхэд, залуусын оюуны чадамжийг хөгжүүлж, өөртөө итгэлтэй, бүтээлч, сэтгэлгээ өндөртэй ирээдүйн манлайлагчдыг бэлтгэх юм. Түүнчлэн, Монголын нэрийг дэлхийд гаргах оюуны спортын шилдэг тамирчдыг төлөвшүүлэхэд хувь нэмрээ оруулахыг бид эрхэмлэдэг.",
        imageUrl: "/placeholder-goals.jpg",
      },
      {
        section: "values",
        title: "Бидний үнэт зүйлс",
        content:
          "Чадварлаг боловсрол: Олон улсын аргачлал дээр суурилсан сургалтын хөтөлбөр\nХүүхэд төвтэй хандлага: Хүүхдийн сэтгэл зүйд нийцсэн уур амьсгал, хандлага\nБүтээлч байдал ба шинийг сэтгэхүй: Хүүхдийг өөрөөр нь сэтгэж, хөгжих боломжийг олгох\nХариуцлага ба тууштай байдал: Суралцах үйл явцдаа тууштай ханддаг хандлагыг төлөвшүүлэх\nХамтын өсөлт: Багш, сурагч, эцэг эхийн хамтын оролцоотой хөгжлийн орчин",
        imageUrl: "/placeholder-values.jpg",
      },
      {
        section: "history",
        title: "Бидний түүх",
        content:
          "Монголын Оюун Ухааны Холбооны албан ёсны салбар болох Officer салбар 20__ онд байгуулагдсан. Үүсгэн байгуулагдсан цагаасаа хойш бид олон зуун хүүхдэд оюуны хөгжил, тархины спортоор дамжуулан өөрийгөө нээх боломжийг олгож, аймаг, дүүргийн болон улсын хэмжээний уралдаан тэмцээнүүдэд амжилттай оролцсон тамирчдыг бэлтгэж ирсэн. Бидний өсөлт, хөгжлийн замнал нь сурагчдын амжилтаар хэмжигддэг бөгөөд өдөр бүр шинэ амжилтын төлөө бид хичээнгүйлэн ажилладаг.",
        imageUrl: "/placeholder-history.jpg",
      },
      {
        section: "contact",
        title: "Холбоо барих",
        contactAddress: "БЗД - 16-р хороо, Улаанбаатар 13321",
        contactPhone: "+976 9999 0000",
        contactEmail: "contact@oyun-uhaanii.mn",
        contactHours: "Даваа-Баасан: 9:00-18:00",
      },
    ];

    // Clear existing content
    await prisma.aboutPageContent.deleteMany();

    // Insert default content
    const results = await Promise.all(
      defaultContent.map((content) =>
        prisma.aboutPageContent.create({
          data: content,
        })
      )
    );

    res.json({ message: "About page content seeded successfully", results });
  } catch (error) {
    console.error("Seed about page content error:", error);
    res.status(500).json({ message: "Failed to seed about page content" });
  }
};
