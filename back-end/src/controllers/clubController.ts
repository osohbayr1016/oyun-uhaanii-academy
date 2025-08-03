import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get club content
export const getClubContent = async (req: Request, res: Response) => {
  try {
    let clubContent = await prisma.club.findFirst();

    if (!clubContent) {
      // Create default club content if none exists
      clubContent = await prisma.club.create({
        data: {
          heroBackgroundImage: "/about3.png",
          clubLogo: "/logosalbariin.png",
          motto: "Оюун ухаанаа хөгжүүлж, ирээдүйгээ бүтээе!",
          mission:
            "Сурагчдын сэтгэхүй, бүтээлч байдал, хамтын ажиллагааг хөгжүүлэх, оюуны спортын соёлыг түгээн дэлгэрүүлэх.",
          athletesCount: "100+",
          typesCount: "6",
          coachesCount: "6+",
          tournamentTitle: "КЛУБИЙН НЭРЭМЖИТ ТЭМЦЭЭНҮҮД",
          tournamentDescription:
            "Манай клубийн нэрэмжит оюуны спортын тэмцээнүүдийг жил бүр тогтмол зохион байгуулдаг. Эдгээр тэмцээнүүд нь сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх, шинэ авьяастнуудыг нээн илрүүлэх зорилготой.",
          tournamentName: "RedS Open",
          tournamentFrequency: "Жил бүр",
          tournamentParticipants: "Клубийн гишүүд болон нийт сурагчид",
          tournamentDetails:
            "Тэмцээний талаарх дэлгэрэнгүй мэдээллийг манай мэдээ болон үйл ажиллагааны хэсгээс авна уу.",
          tournamentButtonText: "МЭДЭЭ",
          introductionTitle: "КЛУБИЙН ТАНИЛЦУУЛГА",
          introductionContent:
            "RedS клуб нь 2020 онд байгуулагдсан бөгөөд Монголын оюуны спортын хөгжүүлэлтийг зорилгоор ажиллаж байна. Манай клуб нь сурагчдын сэтгэхүй, ой тогтоолт, логик сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд чиглэсэн олон төрлийн үйл ажиллагаа явуулдаг. Бид оюуны спортын олон улсын стандартыг Монголд нутагшуулж, шилдэг тамирчдыг төлөвшүүлэхэд хувь нэмрээ оруулж байна.",
          introductionImage: "/about3.png",
          activitiesTitle: "КЛУБИЙН ҮЙЛ АЖИЛЛАГАА",
          activities: [
            {
              imageUrl: "/about3.png",
              title: "Сэтгэхүйн тэмцээн",
              description:
                "Оюуны спортын төрөл бүрийн тэмцээнүүдийг зохион байгуулж, сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх.",
            },
            {
              imageUrl: "/academy.png",
              title: "Сургалт, семинар",
              description:
                "Оюуны спортын талаарх мэргэжлийн сургалт, семинаруудыг зохион байгуулж, сурагчдын мэдлэг, урлагийг дээшлүүлэх.",
            },
            {
              imageUrl: "/xyno.jpg",
              title: "Хамтын ажиллагаа",
              description:
                "Бусад сургуулиуд, байгууллагуудтай хамтран оюуны спортын соёлыг түгээн дэлгэрүүлэх, хамтын ажиллагааг хөгжүүлэх.",
            },
          ],
          typesTitle: "КЛУБИЙН ТӨРЛҮҮД",
          types: [
            {
              imageUrl: "/logo.svg",
              title: "ТҮРГЭН БОДОЛТ",
              description: "Санах ойг хөгжүүлэх дасгал, тэмцээн, сургалт.",
            },
            {
              imageUrl: "/logo.svg",
              title: "ОЙ ТОГТООЛТ",
              description: "Судоку болон логик бодлого бодох клуб.",
            },
            {
              imageUrl: "/logo.svg",
              title: "СПОРТ ӨРӨЛТ",
              description: "Шатрын сургалт, тэмцээн, клубийн үйл ажиллагаа.",
            },
            {
              imageUrl: "/logo.svg",
              title: "РУБИКИЙН ШОО",
              description: "Рубикийн шооны хурд, техник, тэмцээн.",
            },
            {
              imageUrl: "/logo.svg",
              title: "МАТЕМАТИК",
              description: "Математикийн олимпиад, бодлого бодох клуб.",
            },
            {
              imageUrl: "/logo.svg",
              title: "СЭТГЭХҮЙ",
              description: "Сэтгэхүйн хурд, бүтээлч сэтгэлгээ хөгжүүлэх клуб.",
            },
          ],
          membershipTitle: "КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА",
          membershipDescription:
            "Манай клубт элсэхийг хүссэн сурагчид дараах шаардлагыг хангасан байх ёстой. Бид идэвхтэй, оюунлаг, хамт олонч залуусыг урьж байна!",
          membershipRequirements: [
            "8-18 насны сурагч байх",
            "Оюуны спорт, сэтгэхүйн тоглоомд сонирхолтой байх",
            "Багаар ажиллах, хамт олны уур амьсгалыг дэмжих хүсэлтэй байх",
            "Сургалт, тэмцээнд идэвхтэй оролцох",
          ],
          registerButtonText: "Клубт элсэх",
          googleFormLink: "https://forms.google.com/example-form-link",
          internationalAwardsTitle: "ОЛОН УЛСЫН ШАГНАЛУУД",
          internationalAwards: [
            {
              imageUrl: "/about3.png",
              title: "World Memory Championship",
              description: "2023 онд 2-р байр",
            },
            {
              imageUrl: "/academy.png",
              title: "Asian Puzzle Cup",
              description: "2022 онд 1-р байр",
            },
          ],
          domesticAwardsTitle: "ДОТООДЫН ШАГНАЛУУД",
          domesticAwards: [
            {
              imageUrl: "/xyno.jpg",
              title: "Монголын Оюуны Спортын Олимпиад",
              description: "2023 онд 1-р байр",
            },
            {
              imageUrl: "/logosalbariin.png",
              title: "Улсын аварга тэмцээн",
              description: "2022 онд 2-р байр",
            },
          ],
        },
      });
    }

    res.json({
      success: true,
      data: clubContent,
    });
  } catch (error) {
    console.error("Error fetching club content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch club content",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update club content
export const updateClubContent = async (req: Request, res: Response) => {
  try {
    const {
      heroBackgroundImage,
      clubLogo,
      motto,
      mission,
      athletesCount,
      typesCount,
      coachesCount,
      tournamentTitle,
      tournamentDescription,
      tournamentName,
      tournamentFrequency,
      tournamentParticipants,
      tournamentDetails,
      tournamentButtonText,
      introductionTitle,
      introductionContent,
      introductionImage,
      activitiesTitle,
      activities,
      typesTitle,
      types,
      membershipTitle,
      membershipDescription,
      membershipRequirements,
      registerButtonText,
      googleFormLink,
      internationalAwardsTitle,
      internationalAwards,
      domesticAwardsTitle,
      domesticAwards,
    } = req.body;

    // Validate input - at least one field should be provided
    if (
      !heroBackgroundImage &&
      !clubLogo &&
      !motto &&
      !mission &&
      !athletesCount &&
      !typesCount &&
      !coachesCount &&
      !tournamentTitle &&
      !tournamentDescription &&
      !tournamentName &&
      !tournamentFrequency &&
      !tournamentParticipants &&
      !tournamentDetails &&
      !tournamentButtonText &&
      !introductionTitle &&
      !introductionContent &&
      !introductionImage &&
      !activitiesTitle &&
      !activities &&
      !typesTitle &&
      !types &&
      !membershipTitle &&
      !membershipDescription &&
      !membershipRequirements &&
      !registerButtonText &&
      !googleFormLink &&
      !internationalAwardsTitle &&
      !internationalAwards &&
      !domesticAwardsTitle &&
      !domesticAwards
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required for update",
      });
    }

    let clubContent = await prisma.club.findFirst();

    if (!clubContent) {
      // Create new club content if none exists
      clubContent = await prisma.club.create({
        data: {
          heroBackgroundImage: heroBackgroundImage || "/about3.png",
          clubLogo: clubLogo || "/logosalbariin.png",
          motto: motto || "Оюун ухаанаа хөгжүүлж, ирээдүйгээ бүтээе!",
          mission:
            mission ||
            "Сурагчдын сэтгэхүй, бүтээлч байдал, хамтын ажиллагааг хөгжүүлэх, оюуны спортын соёлыг түгээн дэлгэрүүлэх.",
          athletesCount: athletesCount || "100+",
          typesCount: typesCount || "6",
          coachesCount: coachesCount || "6+",
          tournamentTitle: tournamentTitle || "КЛУБИЙН НЭРЭМЖИТ ТЭМЦЭЭНҮҮД",
          tournamentDescription:
            tournamentDescription ||
            "Манай клубийн нэрэмжит оюуны спортын тэмцээнүүдийг жил бүр тогтмол зохион байгуулдаг. Эдгээр тэмцээнүүд нь сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх, шинэ авьяастнуудыг нээн илрүүлэх зорилготой.",
          tournamentName: tournamentName || "RedS Open",
          tournamentFrequency: tournamentFrequency || "Жил бүр",
          tournamentParticipants:
            tournamentParticipants || "Клубийн гишүүд болон нийт сурагчид",
          tournamentDetails:
            tournamentDetails ||
            "Тэмцээний талаарх дэлгэрэнгүй мэдээллийг манай мэдээ болон үйл ажиллагааны хэсгээс авна уу.",
          tournamentButtonText:
            tournamentButtonText || "МЭДЭЭ",
          introductionTitle: introductionTitle || "КЛУБИЙН ТАНИЛЦУУЛГА",
          introductionContent:
            introductionContent ||
            "RedS клуб нь 2020 онд байгуулагдсан бөгөөд Монголын оюуны спортын хөгжүүлэлтийг зорилгоор ажиллаж байна. Манай клуб нь сурагчдын сэтгэхүй, ой тогтоолт, логик сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд чиглэсэн олон төрлийн үйл ажиллагаа явуулдаг. Бид оюуны спортын олон улсын стандартыг Монголд нутагшуулж, шилдэг тамирчдыг төлөвшүүлэхэд хувь нэмрээ оруулж байна.",
          introductionImage: introductionImage || "/about3.png",
          activitiesTitle: activitiesTitle || "КЛУБИЙН ҮЙЛ АЖИЛЛАГАА",
          activities: activities || [
            {
              imageUrl: "/about3.png",
              title: "Сэтгэхүйн тэмцээн",
              description:
                "Оюуны спортын төрөл бүрийн тэмцээнүүдийг зохион байгуулж, сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх.",
            },
            {
              imageUrl: "/academy.png",
              title: "Сургалт, семинар",
              description:
                "Оюуны спортын талаарх мэргэжлийн сургалт, семинаруудыг зохион байгуулж, сурагчдын мэдлэг, урлагийг дээшлүүлэх.",
            },
            {
              imageUrl: "/xyno.jpg",
              title: "Хамтын ажиллагаа",
              description:
                "Бусад сургуулиуд, байгууллагуудтай хамтран оюуны спортын соёлыг түгээн дэлгэрүүлэх, хамтын ажиллагааг хөгжүүлэх.",
            },
          ],
          typesTitle: typesTitle || "КЛУБИЙН ТӨРЛҮҮД",
          types: types || [
            {
              imageUrl: "/logo.svg",
              title: "ТҮРГЭН БОДОЛТ",
              description: "Санах ойг хөгжүүлэх дасгал, тэмцээн, сургалт.",
            },
            {
              imageUrl: "/logo.svg",
              title: "ОЙ ТОГТООЛТ",
              description: "Судоку болон логик бодлого бодох клуб.",
            },
            {
              imageUrl: "/logo.svg",
              title: "СПОРТ ӨРӨЛТ",
              description: "Шатрын сургалт, тэмцээн, клубийн үйл ажиллагаа.",
            },
            {
              imageUrl: "/logo.svg",
              title: "РУБИКИЙН ШОО",
              description: "Рубикийн шооны хурд, техник, тэмцээн.",
            },
            {
              imageUrl: "/logo.svg",
              title: "МАТЕМАТИК",
              description: "Математикийн олимпиад, бодлого бодох клуб.",
            },
            {
              imageUrl: "/logo.svg",
              title: "СЭТГЭХҮЙ",
              description: "Сэтгэхүйн хурд, бүтээлч сэтгэлгээ хөгжүүлэх клуб.",
            },
          ],
          membershipTitle: membershipTitle || "КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА",
          membershipDescription:
            membershipDescription ||
            "Манай клубт элсэхийг хүссэн сурагчид дараах шаардлагыг хангасан байх ёстой. Бид идэвхтэй, оюунлаг, хамт олонч залуусыг урьж байна!",
          membershipRequirements: membershipRequirements || [
            "8-18 насны сурагч байх",
            "Оюуны спорт, сэтгэхүйн тоглоомд сонирхолтой байх",
            "Багаар ажиллах, хамт олны уур амьсгалыг дэмжих хүсэлтэй байх",
            "Сургалт, тэмцээнд идэвхтэй оролцох",
          ],
          registerButtonText: registerButtonText || "Клубт элсэх",
          googleFormLink:
            googleFormLink || "https://forms.google.com/example-form-link",
          internationalAwardsTitle:
            internationalAwardsTitle || "ОЛОН УЛСЫН ШАГНАЛУУД",
          internationalAwards: internationalAwards || [
            {
              imageUrl: "/about3.png",
              title: "World Memory Championship",
              description: "2023 онд 2-р байр",
            },
            {
              imageUrl: "/academy.png",
              title: "Asian Puzzle Cup",
              description: "2022 онд 1-р байр",
            },
          ],
          domesticAwardsTitle: domesticAwardsTitle || "ДОТООДЫН ШАГНАЛУУД",
          domesticAwards: domesticAwards || [
            {
              imageUrl: "/xyno.jpg",
              title: "Монголын Оюуны Спортын Олимпиад",
              description: "2023 онд 1-р байр",
            },
            {
              imageUrl: "/logosalbariin.png",
              title: "Улсын аварга тэмцээн",
              description: "2022 онд 2-р байр",
            },
          ],
        },
      });
    } else {
      // Update existing club content
      clubContent = await prisma.club.update({
        where: { id: clubContent.id },
        data: {
          ...(heroBackgroundImage && { heroBackgroundImage }),
          ...(clubLogo && { clubLogo }),
          ...(motto && { motto }),
          ...(mission && { mission }),
          ...(athletesCount && { athletesCount }),
          ...(typesCount && { typesCount }),
          ...(coachesCount && { coachesCount }),
          ...(tournamentTitle && { tournamentTitle }),
          ...(tournamentDescription && { tournamentDescription }),
          ...(tournamentName && { tournamentName }),
          ...(tournamentFrequency && { tournamentFrequency }),
          ...(tournamentParticipants && { tournamentParticipants }),
          ...(tournamentDetails && { tournamentDetails }),
          ...(tournamentButtonText && { tournamentButtonText }),
          ...(introductionTitle && { introductionTitle }),
          ...(introductionContent && { introductionContent }),
          ...(introductionImage && { introductionImage }),
          ...(activitiesTitle && { activitiesTitle }),
          ...(activities && { activities }),
          ...(typesTitle && { typesTitle }),
          ...(types && { types }),
          ...(membershipTitle && { membershipTitle }),
          ...(membershipDescription && { membershipDescription }),
          ...(membershipRequirements && { membershipRequirements }),
          ...(registerButtonText && { registerButtonText }),
          ...(googleFormLink && { googleFormLink }),
          ...(internationalAwardsTitle && { internationalAwardsTitle }),
          ...(internationalAwards && { internationalAwards }),
          ...(domesticAwardsTitle && { domesticAwardsTitle }),
          ...(domesticAwards && { domesticAwards }),
        },
      });
    }

    res.json({
      success: true,
      message: "Club content updated successfully",
      data: clubContent,
    });
  } catch (error) {
    console.error("Error updating club content:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update club content",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Upload club image (for future use with file upload)
export const uploadClubImage = async (req: Request, res: Response) => {
  try {
    // This endpoint can be extended to handle actual file uploads
    // For now, it accepts image URLs
    const { imageUrl, imageType } = req.body;

    if (!imageUrl || !imageType) {
      return res.status(400).json({
        success: false,
        message: "imageUrl and imageType are required",
      });
    }

    if (!["heroBackgroundImage", "clubLogo"].includes(imageType)) {
      return res.status(400).json({
        success: false,
        message: "imageType must be either 'heroBackgroundImage' or 'clubLogo'",
      });
    }

    let clubContent = await prisma.club.findFirst();

    if (!clubContent) {
      clubContent = await prisma.club.create({
        data: {
          [imageType]: imageUrl,
          [imageType === "heroBackgroundImage"
            ? "clubLogo"
            : "heroBackgroundImage"]:
            imageType === "heroBackgroundImage"
              ? "/logosalbariin.png"
              : "/about3.png",
          motto: "Оюун ухаанаа хөгжүүлж, ирээдүйгээ бүтээе!",
          mission:
            "Сурагчдын сэтгэхүй, бүтээлч байдал, хамтын ажиллагааг хөгжүүлэх, оюуны спортын соёлыг түгээн дэлгэрүүлэх.",
          athletesCount: "100+",
          typesCount: "6",
          coachesCount: "6+",
          tournamentTitle: "КЛУБИЙН НЭРЭМЖИТ ТЭМЦЭЭНҮҮД",
          tournamentDescription:
            "Манай клубийн нэрэмжит оюуны спортын тэмцээнүүдийг жил бүр тогтмол зохион байгуулдаг. Эдгээр тэмцээнүүд нь сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх, шинэ авьяастнуудыг нээн илрүүлэх зорилготой.",
          tournamentName: "RedS Open",
          tournamentFrequency: "Жил бүр",
          tournamentParticipants: "Клубийн гишүүд болон нийт сурагчид",
          tournamentDetails:
            "Тэмцээний талаарх дэлгэрэнгүй мэдээллийг манай мэдээ болон үйл ажиллагааны хэсгээс авна уу.",
          tournamentButtonText: "МЭДЭЭ",
          activitiesTitle: "КЛУБИЙН ҮЙЛ АЖИЛЛАГАА",
          activities: [
            {
              imageUrl: "/about3.png",
              title: "Сэтгэхүйн тэмцээн",
              description:
                "Оюуны спортын төрөл бүрийн тэмцээнүүдийг зохион байгуулж, сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх.",
            },
            {
              imageUrl: "/academy.png",
              title: "Сургалт, семинар",
              description:
                "Оюуны спортын талаарх мэргэжлийн сургалт, семинаруудыг зохион байгуулж, сурагчдын мэдлэг, урлагийг дээшлүүлэх.",
            },
            {
              imageUrl: "/xyno.jpg",
              title: "Хамтын ажиллагаа",
              description:
                "Бусад сургуулиуд, байгууллагуудтай хамтран оюуны спортын соёлыг түгээн дэлгэрүүлэх, хамтын ажиллагааг хөгжүүлэх.",
            },
          ],
          typesTitle: "КЛУБИЙН ТӨРЛҮҮД",
          types: [
            {
              imageUrl: "/logo.svg",
              title: "ТҮРГЭН БОДОЛТ",
              description: "Санах ойг хөгжүүлэх дасгал, тэмцээн, сургалт.",
            },
            {
              imageUrl: "/logo.svg",
              title: "ОЙ ТОГТООЛТ",
              description: "Судоку болон логик бодлого бодох клуб.",
            },
            {
              imageUrl: "/logo.svg",
              title: "СПОРТ ӨРӨЛТ",
              description: "Шатрын сургалт, тэмцээн, клубийн үйл ажиллагаа.",
            },
            {
              imageUrl: "/logo.svg",
              title: "РУБИКИЙН ШОО",
              description: "Рубикийн шооны хурд, техник, тэмцээн.",
            },
            {
              imageUrl: "/logo.svg",
              title: "МАТЕМАТИК",
              description: "Математикийн олимпиад, бодлого бодох клуб.",
            },
            {
              imageUrl: "/logo.svg",
              title: "СЭТГЭХҮЙ",
              description: "Сэтгэхүйн хурд, бүтээлч сэтгэлгээ хөгжүүлэх клуб.",
            },
          ],
          membershipTitle: "КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА",
          membershipDescription:
            "Манай клубт элсэхийг хүссэн сурагчид дараах шаардлагыг хангасан байх ёстой. Бид идэвхтэй, оюунлаг, хамт олонч залуусыг урьж байна!",
          membershipRequirements: [
            "8-18 насны сурагч байх",
            "Оюуны спорт, сэтгэхүйн тоглоомд сонирхолтой байх",
            "Багаар ажиллах, хамт олны уур амьсгалыг дэмжих хүсэлтэй байх",
            "Сургалт, тэмцээнд идэвхтэй оролцох",
          ],
          registerButtonText: "Клубт элсэх",
          googleFormLink: "https://forms.google.com/example-form-link",
        },
      });
    } else {
      clubContent = await prisma.club.update({
        where: { id: clubContent.id },
        data: {
          [imageType]: imageUrl,
        },
      });
    }

    res.json({
      success: true,
      message: `${imageType} uploaded successfully`,
      data: clubContent,
    });
  } catch (error) {
    console.error("Error uploading club image:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload club image",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
