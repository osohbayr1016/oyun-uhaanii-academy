"use client";

import { useState, useEffect } from "react";

interface AboutContent {
  [key: string]: {
    id: string;
    title?: string;
    content?: string;
    imageUrl?: string;
    teamMemberName?: string;
    teamMemberRole?: string;
    teamMemberImage?: string;
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
          <p className="mt-4 text-gray-600">Ачаалж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section with Photo */}
        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h1 className="text-4xl font-bold mb-6 text-gray-800">
                  {content.hero?.title || "Бидний тухай"}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
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

        <section className="mb-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-lg text-gray-600 mb-8 leading-relaxed text-center">
              Бид тархины спортыг олон нийтэд түгээж, оюуны спортын олон улсын
              стандартыг Монголд нутагшуулах зорилгоор ажилладаг.
            </p>

            {/* Goals Section with Image */}
            <div className="mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
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
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4">
                <img
                  src="https://scontent.fuln10-1.fna.fbcdn.net/v/t39.30808-6/514373551_30523915777255201_8084638872900171614_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=3CQS-5DjHn0Q7kNvwHTrnds&_nc_oc=Adn74ZyA8pgPLL8rq00xCyn6BLCHDRTvazSZogZ0AvuSyogC94aUQTOdr4oIbtJPK-0&_nc_zt=23&_nc_ht=scontent.fuln10-1.fna&_nc_gid=08mXr5CaTiWH9BmlARriyg&oh=00_AfQ72yYVi9--7Ul-HkPeckkSwLU97q1wOUodbFnr2liDmg&oe=68739ADF"
                  alt="profile image"
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Чинзориг
              </h3>
              <p className="text-gray-600">Боловсролын захирал</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4">
                <img
                  src="https://scontent.fuln10-1.fna.fbcdn.net/v/t1.6435-9/118368577_3367309096659219_1911526946808565183_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=QABc6GEU73MQ7kNvwG-mnX4&_nc_oc=Adl-ga-AV-iy4ias7oJQDQoLowqWJRtMpRezeflfSf_TWBknARQFx9LGbOdCuuiR9RA&_nc_zt=23&_nc_ht=scontent.fuln10-1.fna&_nc_gid=vielpwbgnkytydSmfRO3sw&oh=00_AfT8L7QsCqmQSR2t6BgW3z6PF-7xPZAJKmpTdyzGs0OH1A&oe=689548C7"
                  alt="profile image"
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Ариунгэрэл
              </h3>
              <p className="text-gray-600">Ерөнхий захирал</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4">
                <img className="rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Э.Эрдэнэмандах
              </h3>
              <p className="text-gray-600">Ахлах багш</p>
            </div>
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
