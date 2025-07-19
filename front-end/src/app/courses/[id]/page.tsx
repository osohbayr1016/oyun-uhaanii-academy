"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CONTACT_PHONE = "7000-2266";
const CONTACT_EMAIL = "support@mastermind.mn";
const CONTACT_ADDRESS =
  "ХУД, 15-р хороо, Зайсан гудамж, Гэгээнтэн цогцолбор, 6-603";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    fetch(`/api/courses/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch course");
        return res.json();
      })
      .then((data) => setCourse(data))
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center">Уншиж байна...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;
  if (!course) return <div className="p-8 text-center">Сургалт олдсонгүй</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section: Title + Intro + Buttons */}
      <section
        className="relative w-full min-h-[320px] md:min-h-[420px] flex items-center justify-center overflow-hidden"
        style={{
          background: `url(https://admin.mastermind.mn/images/1733878176391.jpg) center/cover no-repeat`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/40 to-blue-700/30" />
        {/* Decorative SVG */}
        <svg
          className="absolute left-0 top-0 w-64 h-64 opacity-30 blur-2xl"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle fill="#60a5fa" cx="100" cy="100" r="100" />
        </svg>
        <svg
          className="absolute right-0 bottom-0 w-80 h-80 opacity-20 blur-3xl"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#fbbf24" x="0" y="0" width="200" height="200" rx="80" />
        </svg>
        {/* Glassmorphism Card */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center gap-8">
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-center text-white tracking-tight">
              {course.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow text-center text-white/90 font-medium">
              {course.description}
            </p>
            <button
              onClick={() => setShowVideo(true)}
              className="bg-white/90 hover:bg-blue-600 hover:text-white text-blue-700 font-semibold px-10 py-4 rounded-2xl text-xl shadow-lg border border-white/40 transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-bounce-slow"
            >
              Танилцуулга Видео
            </button>
          </div>
        </div>
      </section>

      {/* Description Titles and Paragraphs */}
      <section className="w-full bg-white py-12 px-4 flex flex-col items-center">
        <div className="max-w-3xl w-full flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-blue-800">
              Сургалтын зорилго
            </h2>
            <p className="text-gray-700">
              {course.goal || "Мэдээлэл байхгүй."}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-blue-800">
              Хэнд зориулагдсан бэ?
            </h2>
            <p className="text-gray-700">
              {course.target || "Мэдээлэл байхгүй."}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-blue-800">
              Сургалтын бүтэц
            </h2>
            <p className="text-gray-700">
              {course.structure || "Мэдээлэл байхгүй."}
            </p>
          </div>
        </div>
      </section>

      {/* Танилцуулга Видео Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl shadow-2xl flex items-center justify-center">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg text-2xl"
              aria-label="Close video"
            >
              ×
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/sWYyDOLJ6Y8?autoplay=1"
              title="Youtube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Image + Text Section (like mastermind.mn) */}
      {(course.sectionImage || course.sectionText) && (
        <section className="w-full bg-white py-16 px-4 flex flex-col items-center">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
            {/* Left: Image */}
            {course.sectionImage && (
              <div className="flex-1 flex justify-center mb-8 md:mb-0">
                <img
                  src={course.sectionImage}
                  alt="Course section"
                  className="rounded-xl shadow-lg max-h-72 object-cover"
                />
              </div>
            )}
            {/* Right: Text */}
            {course.sectionText && (
              <div className="flex-1 text-lg text-gray-800 leading-relaxed">
                {course.sectionText}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lessons Section (optional) */}
      {course.lessons && course.lessons.length > 0 && (
        <section className="w-full bg-white py-8 px-4 flex flex-col items-center">
          <div className="max-w-4xl w-full">
            <h3 className="text-2xl font-bold mb-3 text-blue-700">Хичээлүүд</h3>
            <ul className="list-disc ml-8 text-lg text-gray-800">
              {course.lessons.map((lesson: any) => (
                <li key={lesson.id}>{lesson.title}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Enroll Button */}
      <div className="flex justify-center my-12">
        {course.enrollLink ? (
          <a
            href={course.enrollLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-5 rounded-2xl text-2xl shadow-xl transition-all duration-200 text-center"
          >
            Сургалтанд бүртгүүлэх
          </a>
        ) : (
          <button
            className="bg-gray-400 text-white font-bold px-12 py-5 rounded-2xl text-2xl shadow-xl cursor-not-allowed"
            disabled
          >
            Сургалтанд бүртгүүлэх
          </button>
        )}
      </div>

      {/* Contact Section */}
      <section className="w-full bg-blue-50 py-8 px-4 flex flex-col items-center">
        <div className="max-w-3xl w-full text-center">
          <h3 className="text-xl font-bold mb-2 text-blue-700">Холбоо барих</h3>
          <div className="mb-1">
            Утас:{" "}
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="text-blue-600 hover:underline"
            >
              {CONTACT_PHONE}
            </a>
          </div>
          <div className="mb-1">
            И-мэйл:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-blue-600 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="mb-1">{CONTACT_ADDRESS}</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-4 text-center border-t text-gray-500 text-sm">
        © 2024 | Mastermind.mn
      </footer>
    </div>
  );
}
