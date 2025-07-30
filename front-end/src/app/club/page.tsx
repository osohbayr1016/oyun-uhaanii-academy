"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Activity {
  imageUrl: string;
  title: string;
  description: string;
}

interface ClubType {
  imageUrl: string;
  title: string;
  description: string;
}

const ClubPage = () => {
  const [clubContent, setClubContent] = useState({
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
    tournamentButtonText: "Тэмцээний мэдээлэл үзэх",
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
    ] as Activity[],
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
    ] as ClubType[],
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
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClubContent = async () => {
      try {
        const response = await fetch("/api/club");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setClubContent({
              heroBackgroundImage:
                data.data.heroBackgroundImage || "/about3.png",
              clubLogo: data.data.clubLogo || "/logosalbariin.png",
              motto:
                data.data.motto || "Оюун ухаанаа хөгжүүлж, ирээдүйгээ бүтээе!",
              mission:
                data.data.mission ||
                "Сурагчдын сэтгэхүй, бүтээлч байдал, хамтын ажиллагааг хөгжүүлэх, оюуны спортын соёлыг түгээн дэлгэрүүлэх.",
              athletesCount: data.data.athletesCount || "100+",
              typesCount: data.data.typesCount || "6",
              coachesCount: data.data.coachesCount || "6+",
              tournamentTitle:
                data.data.tournamentTitle || "КЛУБИЙН НЭРЭМЖИТ ТЭМЦЭЭНҮҮД",
              tournamentDescription:
                data.data.tournamentDescription ||
                "Манай клубийн нэрэмжит оюуны спортын тэмцээнүүдийг жил бүр тогтмол зохион байгуулдаг. Эдгээр тэмцээнүүд нь сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх, шинэ авьяастнуудыг нээн илрүүлэх зорилготой.",
              tournamentName: data.data.tournamentName || "RedS Open",
              tournamentFrequency: data.data.tournamentFrequency || "Жил бүр",
              tournamentParticipants:
                data.data.tournamentParticipants ||
                "Клубийн гишүүд болон нийт сурагчид",
              tournamentDetails:
                data.data.tournamentDetails ||
                "Тэмцээний талаарх дэлгэрэнгүй мэдээллийг манай мэдээ болон үйл ажиллагааны хэсгээс авна уу.",
              tournamentButtonText:
                data.data.tournamentButtonText || "Тэмцээний мэдээлэл үзэх",
              introductionTitle:
                data.data.introductionTitle || "КЛУБИЙН ТАНИЛЦУУЛГА",
              introductionContent:
                data.data.introductionContent ||
                "RedS клуб нь 2020 онд байгуулагдсан бөгөөд Монголын оюуны спортын хөгжүүлэлтийг зорилгоор ажиллаж байна. Манай клуб нь сурагчдын сэтгэхүй, ой тогтоолт, логик сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлэхэд чиглэсэн олон төрлийн үйл ажиллагаа явуулдаг. Бид оюуны спортын олон улсын стандартыг Монголд нутагшуулж, шилдэг тамирчдыг төлөвшүүлэхэд хувь нэмрээ оруулж байна.",
              introductionImage: data.data.introductionImage || "/about3.png",
              activitiesTitle:
                data.data.activitiesTitle || "КЛУБИЙН ҮЙЛ АЖИЛЛАГАА",
              activities: data.data.activities || [
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
              typesTitle: data.data.typesTitle || "КЛУБИЙН ТӨРЛҮҮД",
              types: data.data.types || [
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
                  description:
                    "Шатрын сургалт, тэмцээн, клубийн үйл ажиллагаа.",
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
                  description:
                    "Сэтгэхүйн хурд, бүтээлч сэтгэлгээ хөгжүүлэх клуб.",
                },
              ],
              membershipTitle:
                data.data.membershipTitle || "КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА",
              membershipDescription:
                data.data.membershipDescription ||
                "Манай клубт элсэхийг хүссэн сурагчид дараах шаардлагыг хангасан байх ёстой. Бид идэвхтэй, оюунлаг, хамт олонч залуусыг урьж байна!",
              membershipRequirements: data.data.membershipRequirements || [
                "8-18 насны сурагч байх",
                "Оюуны спорт, сэтгэхүйн тоглоомд сонирхолтой байх",
                "Багаар ажиллах, хамт олны уур амьсгалыг дэмжих хүсэлтэй байх",
                "Сургалт, тэмцээнд идэвхтэй оролцох",
              ],
              registerButtonText: data.data.registerButtonText || "Клубт элсэх",
              googleFormLink:
                data.data.googleFormLink ||
                "https://forms.google.com/example-form-link",
              internationalAwardsTitle:
                data.data.internationalAwardsTitle || "ОЛОН УЛСЫН ШАГНАЛУУД",
              internationalAwards: data.data.internationalAwards || [
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
              domesticAwardsTitle:
                data.data.domesticAwardsTitle || "ДОТООДЫН ШАГНАЛУУД",
              domesticAwards: data.data.domesticAwards || [
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
            });
            setClubContent((prev) => ({
              ...prev,
              membershipTitle:
                data.data.membershipTitle || "КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА",
              membershipDescription:
                data.data.membershipDescription ||
                "Манай клубт элсэхийг хүссэн сурагчид дараах шаардлагыг хангасан байх ёстой. Бид идэвхтэй, оюунлаг, хамт олонч залуусыг урьж байна!",
              membershipRequirements: data.data.membershipRequirements || [
                "8-18 насны сурагч байх",
                "Оюуны спорт, сэтгэхүйн тоглоомд сонирхолтой байх",
                "Багаар ажиллах, хамт олны уур амьсгалыг дэмжих хүсэлтэй байх",
                "Сургалт, тэмцээнд идэвхтэй оролцох",
              ],
              registerButtonText: data.data.registerButtonText || "Клубт элсэх",
              googleFormLink:
                data.data.googleFormLink ||
                "https://forms.google.com/example-form-link",
              internationalAwardsTitle:
                data.data.internationalAwardsTitle || "ОЛОН УЛСЫН ШАГНАЛУУД",
              internationalAwards: data.data.internationalAwards || [
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
              domesticAwardsTitle:
                data.data.domesticAwardsTitle || "ДОТООДЫН ШАГНАЛУУД",
              domesticAwards: data.data.domesticAwards || [
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
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching club content:", error);
        // Use default values if API fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubContent();
  }, []);

  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Hero section with background image and all top content in one section */}
      <section className="relative w-full min-h-[520px] flex items-center justify-center z-10 overflow-hidden pt-8">
        {/* Background image and overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={clubContent.heroBackgroundImage}
            alt="Club Hero Background"
            className="w-full h-full object-cover object-center opacity-40"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/10" />
        </div>
        {/* Content - unified with background */}
        <div className="relative z-10 w-full container mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight drop-shadow-md mb-4">
                RedS <span className="text-[#550080]">КЛУБ</span>
              </h1>
              {/* Motto and Mission */}
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center md:justify-start">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-[#550080] mb-2">
                    БИДНИЙ УРИА
                  </h3>
                  <p className="text-gray-800 text-lg drop-shadow-sm">
                    "{clubContent.motto}"
                  </p>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-[#550080] mb-2">
                    БИДНИЙ ЗОРИЛГО
                  </h3>
                  <p className="text-gray-800 text-lg drop-shadow-sm">
                    {clubContent.mission}
                  </p>
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#550080] drop-shadow">
                    {clubContent.athletesCount}
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 drop-shadow">
                    Тамирчид
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#550080] drop-shadow">
                    {clubContent.typesCount}
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 drop-shadow">
                    Төрөл
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#550080] drop-shadow">
                    {clubContent.coachesCount}
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 drop-shadow">
                    Дасгалжуулагч
                  </div>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="relative order-first lg:order-last flex justify-center">
              <img
                src={clubContent.clubLogo}
                alt="Клубын лого"
                width={350}
                height={200}
                className="mx-auto w-auto h-48 sm:h-64 object-contain "
                style={{ zIndex: 2 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Club Introduction Section */}
      <section className="container mx-auto px-4 pb-8 mt-16">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#550080] mb-6">
                {clubContent.introductionTitle}
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {clubContent.introductionContent}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={clubContent.introductionImage}
                  alt="Клубын танилцуулга"
                  className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regular Tournaments Section */}
      <section className="container mx-auto px-4 pb-8 mt-16">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#550080] mb-4 text-center">
            {clubContent.tournamentTitle}
          </h2>
          <p className="text-gray-700 text-lg mb-6 text-center max-w-2xl">
            {clubContent.tournamentDescription}
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-[#550080] rounded-lg p-6 w-full max-w-xl mb-4">
            <div className="font-semibold text-[#550080] text-xl mb-2 text-center">
              "{clubContent.tournamentName}"
            </div>
            <div className="text-gray-700 mb-1 ">
              Зохиогдох давтамж:{" "}
              <span className="font-medium">
                {clubContent.tournamentFrequency}
              </span>
            </div>
            <div className="text-gray-700 mb-2">
              Оролцогчид:{" "}
              <span className="font-medium">
                {clubContent.tournamentParticipants}
              </span>
            </div>
            <div className="text-gray-600 text-sm">
              {clubContent.tournamentDetails}
            </div>
          </div>
          <a
            href="/tournaments"
            className="mt-2 inline-block bg-[#550080] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
          >
            {clubContent.tournamentButtonText}
          </a>
        </div>
      </section>
      {/* Activities Section */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          {clubContent.activitiesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clubContent.activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={activity.imageUrl}
                  alt={activity.title}
                  className="w-24 h-24 object-cover rounded-full border-4 border-[#550080] bg-gray-100"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#550080] mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Club Types Section */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#550080] mb-8 text-center">
          {clubContent.typesTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {clubContent.types.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center"
            >
              <img
                src={type.imageUrl}
                alt={type.title}
                className="w-28 h-28 "
              />
              <div className="font-semibold text-[#550080] text-lg mb-1">
                {type.title}
              </div>
              <div className="text-gray-600 text-sm">{type.description}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Membership Requirements Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-[#550080]/90 to-blue-500/80 rounded-xl shadow-lg p-8 flex flex-col items-center text-white border-2 border-[#550080]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center drop-shadow">
            {clubContent.membershipTitle}
          </h2>
          <p className="text-lg mb-6 text-center max-w-2xl drop-shadow">
            {clubContent.membershipDescription}
          </p>
          <ul className="space-y-3 w-full max-w-lg">
            {clubContent.membershipRequirements.map((requirement, index) => (
              <li
                key={index}
                className="flex items-center gap-3 bg-white/90 text-[#550080] rounded-lg px-4 py-3 font-semibold shadow"
              >
                <span className="text-2xl">✔️</span> {requirement}
              </li>
            ))}
          </ul>
          <a
            href={clubContent.googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-white text-[#550080] px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-100 transition-colors text-lg"
          >
            {clubContent.registerButtonText}
          </a>
        </div>
      </section>
      {/* Awards Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* International Awards */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#550080] mb-4 text-center md:text-left">
              {clubContent.internationalAwardsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clubContent.internationalAwards.map((award, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
                >
                  <img
                    src={award.imageUrl}
                    alt={award.title}
                    className="w-16 h-16 object-cover rounded-full border-2 border-[#550080] mb-2"
                  />
                  <div className="font-semibold text-[#550080] text-center">
                    {award.title}
                  </div>
                  <div className="text-gray-600 text-sm text-center">
                    {award.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Domestic Awards */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#550080] mb-4 text-center md:text-left">
              {clubContent.domesticAwardsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clubContent.domesticAwards.map((award, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
                >
                  <img
                    src={award.imageUrl}
                    alt={award.title}
                    className="w-16 h-16 object-cover rounded-full border-2 border-[#550080] mb-2"
                  />
                  <div className="font-semibold text-[#550080] text-center">
                    {award.title}
                  </div>
                  <div className="text-gray-600 text-sm text-center">
                    {award.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClubPage;
