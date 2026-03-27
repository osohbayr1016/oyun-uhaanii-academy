import type { Prisma } from "@prisma/client";
export const defaultClubCreateData: Prisma.ClubCreateInput = {
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
};
