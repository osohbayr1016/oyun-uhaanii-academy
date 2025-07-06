const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Бидний тухай
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Оюун Ухааны Академи нь Монголын соёл, түүх, уран зохиолын талаар
              суралцах боломжийг бүрдүүлж, ирээдүйн үеийнхэнд эртний мудрость,
              ухаан, соёлыг дамжуулах зорилготой байгууллага юм.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Бидний зорилго
                </h3>
                <p className="text-gray-600">
                  Монголын соёл, түүх, уран зохиолын талаар суралцах боломжийг
                  бүрдүүлж, ирээдүйн үеийнхэнд эртний мудрость, ухаан, соёлыг
                  дамжуулах.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Бидний үнэт зүйлс
                </h3>
                <p className="text-gray-600">
                  Соёлын өв, ухаан, мудрость, боловсрол, хөгжил дэвшлийг дэмжих,
                  ирээдүйн үеийнхэнд эртний мудрость, ухаан, соёлыг дамжуулах.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Бидний түүх
              </h3>
              <p className="text-gray-600 leading-relaxed">
                2020 онд байгуулагдсан Оюун Ухааны Академи нь Монголын соёл,
                түүх, уран зохиолын талаар суралцах боломжийг бүрдүүлж, ирээдүйн
                үеийнхэнд эртний мудрость, ухаан, соёлыг дамжуулах зорилготой
                байгууллага юм. Бид өнөөг хүртэл 1000 гаруй сурагчидтай ажиллаж,
                тэдэнд чанартай боловсрол өгч ирсэн.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Бидний баг
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Б. Батбаяр
              </h3>
              <p className="text-gray-600">Ерөнхий захирал</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Д. Сүхбат
              </h3>
              <p className="text-gray-600">Боловсролын захирал</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Л. Мөнхбат
              </h3>
              <p className="text-gray-600">Хөгжлийн захирал</p>
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
                  Улаанбаатар хот, Сүхбаатар дүүрэг
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Утас
                </h3>
                <p className="text-gray-600">+976 9999 0000</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  И-мэйл
                </h3>
                <p className="text-gray-600">contact@oyun-uhaanii.mn</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Цагийн хуваарь
                </h3>
                <p className="text-gray-600">Даваа-Баасан: 9:00-18:00</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
