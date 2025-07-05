import Header from "../_components/Header";
import Footer from "../_components/Footer";

const TournamentsPage = () => {
  const tournaments = [
    {
      id: "1",
      title: "Монголын түүхэн олимпиад",
      description:
        "Монголын түүхэн дэх чухал үйл явдлуудын талаарх мэдлэгийн тэмцээн",
      date: "2024-12-15",
      location: "Улаанбаатар",
      participants: 150,
      prize: "1,000,000 ₮",
      status: "Бүртгэл идэвхтэй",
    },
    {
      id: "2",
      title: "Уран зохиолын уншлага",
      description: "Монголын сонгодог уран зохиолын уншлагын тэмцээн",
      date: "2024-11-20",
      location: "Улаанбаатар",
      participants: 80,
      prize: "500,000 ₮",
      status: "Бүртгэл идэвхтэй",
    },
    {
      id: "3",
      title: "Географийн мэдлэгийн тэмцээн",
      description: "Монгол улсын байгаль, газар зүйн мэдлэгийн тэмцээн",
      date: "2024-10-30",
      location: "Улаанбаатар",
      participants: 120,
      prize: "750,000 ₮",
      status: "Дууссан",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Бүртгэл идэвхтэй":
        return "bg-green-100 text-green-800";
      case "Дууссан":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-12 mt-16">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Тэмцээнүүд
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            Монголын соёл, түүх, уран зохиолтой холбоотой тэмцээнүүд
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tournament.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {tournament.description}
                  </p>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="font-medium w-20">Огноо:</span>
                    <span>
                      {new Date(tournament.date).toLocaleDateString("mn-MN")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-20">Байршил:</span>
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-20">Оролцогч:</span>
                    <span>{tournament.participants}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-20">Шагнал:</span>
                    <span className="font-semibold text-green-600">
                      {tournament.prize}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(
                      tournament.status
                    )}`}
                  >
                    {tournament.status}
                  </span>
                </div>

                {tournament.status === "Бүртгэл идэвхтэй" && (
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Бүртгүүлэх
                  </button>
                )}

                {tournament.status === "Дууссан" && (
                  <button className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed">
                    Дууссан
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Тэмцээнд оролцох дүрэм
          </h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="text-left space-y-4 text-gray-600">
              <p>• Тэмцээнд 7-18 насны хүүхдүүд оролцох боломжтой</p>
              <p>• Оролцогч бүр зөвхөн нэг тэмцээнд бүртгүүлэх боломжтой</p>
              <p>
                • Тэмцээний дүнгийн талаар дэлгэрэнгүй мэдээллийг вэбсайтаас
                харна уу
              </p>
              <p>• Шагнал хүртэгчдийг тэмцээний дараа зарлана</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TournamentsPage;
