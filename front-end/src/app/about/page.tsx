"use client";

import { useState, useEffect } from "react";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

interface AboutContent {
  [key: string]: {
    id: string;
    title?: string;
    content?: string;
    imageUrl?: string;
    teamMemberName?: string;
    teamMemberRole?: string;
    teamMemberImage?: string;
    teamMembers?: TeamMember[];
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactHours?: string;
  };
}

const AboutPage = () => {
  const [content, setContent] = useState<AboutContent>({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/about");
      if (!response.ok) {
        throw new Error("Failed to fetch about page content");
      }
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching about page content:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">уншиж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section with Photo */}
        <section className="mb-12 sm:mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">
                  {content.hero?.title || "Бидний тухай"}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {content.hero?.content ||
                    "Монголын Оюун Ухааны Холбооны Officer салбар нь хүүхэд, өсвөр үеийнхний сэтгэн бодох чадвар, анхаарал төвлөрөл, ой тогтоолтыг хөгжүүлэхэд чиглэсэн мэргэжлийн сургалтуудыг санал болгодог."}
                </p>
              </div>
              <div className="relative">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                    {/* Photo placeholder - replace src with your actual image */}
                    <img
                      src={content.hero?.imageUrl || "/placeholder-about.jpg"}
                      alt="Оюун Ухааны Академийн баг"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const nextElement =
                          target.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = "flex";
                        }
                      }}
                    />
                    <div
                      className="w-full h-full flex items-center justify-center text-gray-500 text-center p-8"
                      style={{ display: "none" }}
                    >
                      <div>
                        <div className="text-4xl mb-4">📸</div>
                        <p className="text-lg font-medium">Зураг нэмэх</p>
                        <p className="text-sm mt-2">
                          Энд академийн баг, сургалтын орчин эсвэл үйл
                          ажиллагааны зургийг оруулна уу
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 sm:mb-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed text-center px-4">
              Бид тархины спортыг олон нийтэд түгээж, оюуны спортын олон улсын
              стандартыг Монголд нутагшуулах зорилгоор ажилладаг.
            </p>

            {/* Goals Section with Image */}
            <div className="mb-12 sm:mb-16">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
                    {content.goals?.title || "Бидний зорилго"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {content.goals?.content ||
                      "Бидний үндсэн зорилго бол хүүхэд, залуусын оюуны чадамжийг хөгжүүлж, өөртөө итгэлтэй, бүтээлч, сэтгэлгээ өндөртэй ирээдүйн манлайлагчдыг бэлтгэх юм. Түүнчлэн, Монголын нэрийг дэлхийд гаргах оюуны спортын шилдэг тамирчдыг төлөвшүүлэхэд хувь нэмрээ оруулахыг бид эрхэмлэдэг."}
                  </p>
                </div>
                <div className="relative">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={
                          content.goals?.imageUrl || "/placeholder-goals.jpg"
                        }
                        alt="Бидний зорилго"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const nextElement =
                            target.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = "flex";
                          }
                        }}
                      />
                      <div
                        className="w-full h-full flex items-center justify-center text-gray-500 text-center p-8"
                        style={{ display: "none" }}
                      >
                        <div>
                          <div className="text-4xl mb-4">🎯</div>
                          <p className="text-lg font-medium">Зорилгын зураг</p>
                          <p className="text-sm mt-2">
                            Энд зорилготой холбоотой зургийг оруулна уу
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Values Section with Image */}
            <div className="mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={
                          content.values?.imageUrl || "/placeholder-values.jpg"
                        }
                        alt="Бидний үнэт зүйлс"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const nextElement =
                            target.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = "flex";
                          }
                        }}
                      />
                      <div
                        className="w-full h-full flex items-center justify-center text-gray-500 text-center p-8"
                        style={{ display: "none" }}
                      >
                        <div>
                          <div className="text-4xl mb-4">💎</div>
                          <p className="text-lg font-medium">
                            Үнэт зүйлсийн зураг
                          </p>
                          <p className="text-sm mt-2">
                            Энд үнэт зүйлстэй холбоотой зургийг оруулна уу
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md order-1 lg:order-2">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                    {content.values?.title || "Бидний үнэт зүйлс"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {content.values?.content ||
                      "Чадварлаг боловсрол: Олон улсын аргачлал дээр суурилсан сургалтын хөтөлбөр Хүүхэд төвтэй хандлага: Хүүхдийн сэтгэл зүйд нийцсэн уур амьсгал, хандлага Бүтээлч байдал ба шинийг сэтгэхүй: Хүүхдийг өөрөөр нь сэтгэж, хөгжих боломжийг олгох Хариуцлага ба тууштай байдал: Суралцах үйл явцдаа тууштай ханддаг хандлагыг төлөвшүүлэх Хамтын өсөлт: Багш, сурагч, эцэг эхийн хамтын оролцоотой хөгжлийн орчин"}
                  </p>
                </div>
              </div>
            </div>

            {/* History Section with Image */}
            <div className="mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                    {content.history?.title || "Бидний түүх"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {content.history?.content ||
                      "Монголын Оюун Ухааны Холбооны албан ёсны салбар болох Officer салбар 20__ онд байгуулагдсан. Үүсгэн байгуулагдсан цагаасаа хойш бид олон зуун хүүхдэд оюуны хөгжил, тархины спортоор дамжуулан өөрийгөө нээх боломжийг олгож, аймаг, дүүргийн болон улсын хэмжээний уралдаан тэмцээнүүдэд амжилттай оролцсон тамирчдыг бэлтгэж ирсэн. Бидний өсөлт, хөгжлийн замнал нь сурагчдын амжилтаар хэмжигддэг бөгөөд өдөр бүр шинэ амжилтын төлөө бид хичээнгүйлэн ажилладаг."}
                  </p>
                </div>
                <div className="relative">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={
                          content.history?.imageUrl ||
                          "/placeholder-history.jpg"
                        }
                        alt="Бидний түүх"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const nextElement =
                            target.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = "flex";
                          }
                        }}
                      />
                      <div
                        className="w-full h-full flex items-center justify-center text-gray-500 text-center p-8"
                        style={{ display: "none" }}
                      >
                        <div>
                          <div className="text-4xl mb-4">📚</div>
                          <p className="text-lg font-medium">Түүхийн зураг</p>
                          <p className="text-sm mt-2">
                            Энд академийн түүхтэй холбоотой зургийг оруулна уу
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Бидний баг
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(content.team?.teamMembers || []).length > 0 ? (
              (content.team?.teamMembers || []).map(
                (member: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-lg shadow-md text-center"
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                      {member.imageUrl ? (
                        <img
                          src={member.imageUrl}
                          alt={member.name || "profile image"}
                          className="rounded-full w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                          👤
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {member.name || "-"}
                    </h3>
                    <p className="text-gray-600">{member.role || "-"}</p>
                  </div>
                )
              )
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                Багийн гишүүн байхгүй байна.
              </div>
            )}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Холбоо барих
          </h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Хаяг
                </h3>
                <p className="text-gray-600">
                  {content.contact?.contactAddress ||
                    "БЗД - 16-р хороо, Улаанбаатар 13321"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Утас
                </h3>
                <p className="text-gray-600">
                  {content.contact?.contactPhone || "+976 9999 0000"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  И-мэйл
                </h3>
                <p className="text-gray-600">
                  {content.contact?.contactEmail || "contact@oyun-uhaanii.mn"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Цагийн хуваарь
                </h3>
                <p className="text-gray-600">
                  {content.contact?.contactHours || "Даваа-Баасан: 9:00-18:00"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
