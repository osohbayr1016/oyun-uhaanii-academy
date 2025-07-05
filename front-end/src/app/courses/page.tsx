import Header from "../_components/Header";
import Footer from "../_components/Footer";
import CourseCard from "./_components/CourseCard";

const CoursesPage = () => {
  const courses = [
    {
      id: "1",
      title: "Монголын уран зохиол",
      description: "Монголын сонгодог уран зохиолын сургалт",
      duration: "8 долоо хоног",
      level: "Эхлэгч",
      price: 150000,
      currency: "₮",
      imageUrl: "/xyno.jpg",
      instructor: "Б. Батбаяр",
    },
    {
      id: "2",
      title: "Монголын түүх",
      description: "Монголын түүхэн дэх чухал үйл явдлууд",
      duration: "12 долоо хоног",
      level: "Дунд",
      price: 200000,
      currency: "₮",
      imageUrl: "/xyno.jpg",
      instructor: "Д. Сүхбат",
    },
    {
      id: "3",
      title: "Монголын география",
      description: "Монгол улсын байгаль, газар зүй",
      duration: "6 долоо хоног",
      level: "Эхлэгч",
      price: 120000,
      currency: "₮",
      imageUrl: "/xyno.jpg",
      instructor: "Л. Мөнхбат",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-12 mt-16">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Сургалтууд
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            Монголын соёл, түүх, уран зохиолын талаар суралцах боломжтой
            сургалтууд
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
