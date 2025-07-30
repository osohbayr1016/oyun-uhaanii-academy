"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CONTACT_PHONE = "+976 11302266";
const CONTACT_EMAIL = "bilguunundarmal@gmail.com";
const CONTACT_ADDRESS =
  "БЗД, 16-р хороо, Дандарбаатарын гудамж, 'ХОРГО' хотхон, 2-2 байр";

// Helper function to convert YouTube URL to embed format
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return "";

  try {
    // Handle different YouTube URL formats
    let videoId = "";

    // Regular watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    if (watchMatch) {
      videoId = watchMatch[1];
    }

    // Short URLs: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^&\n?#]+)/);
    if (shortMatch) {
      videoId = shortMatch[1];
    }

    // Already embed URLs: https://www.youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
    if (embedMatch) {
      videoId = embedMatch[1];
    }

    if (videoId) {
      // Add additional parameters for better compatibility
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1${
        origin ? `&origin=${encodeURIComponent(origin)}` : ""
      }`;
    }

    console.warn("Could not extract video ID from URL:", url);
    return "";
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
    return "";
  }
};

// Helper function to validate YouTube URL
const isValidYouTubeUrl = (url: string): boolean => {
  if (!url) return false;

  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/,
    /^(https?:\/\/)?(www\.)?youtu\.be\/[a-zA-Z0-9_-]+/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/,
  ];

  return patterns.some((pattern) => pattern.test(url));
};

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoTimeout, setVideoTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    fetch(`/api/courses/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch course");
        return res.json();
      })
      .then((data) => {
        console.log("Course data loaded:", data);
        console.log("YouTube URL:", data.youtubeUrl);
        setCourse(data);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, [id]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (videoTimeout) {
        clearTimeout(videoTimeout);
      }
    };
  }, [videoTimeout]);

  const handleVideoClick = () => {
    console.log("Video button clicked");
    console.log("Course YouTube URL:", course?.youtubeUrl);

    if (!course?.youtubeUrl) {
      console.log("No YouTube URL found");
      setVideoError(true);
      return;
    }

    if (!isValidYouTubeUrl(course.youtubeUrl)) {
      console.log("Invalid YouTube URL format:", course.youtubeUrl);
      setVideoError(true);
      return;
    }

    const embedUrl = getYouTubeEmbedUrl(course.youtubeUrl);
    console.log("Generated embed URL:", embedUrl);

    if (!embedUrl) {
      console.log("Failed to generate embed URL");
      setVideoError(true);
      return;
    }

    setVideoError(false);
    setVideoLoading(true);
    setShowVideo(true);

    // Add a timeout in case the video fails to load
    const timeout = setTimeout(() => {
      if (videoLoading) {
        console.log("Video loading timeout - showing error");
        handleVideoError();
      }
    }, 10000); // 10 second timeout

    setVideoTimeout(timeout);
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setVideoLoading(false);
    if (videoTimeout) {
      clearTimeout(videoTimeout);
      setVideoTimeout(null);
    }
  };

  const handleVideoError = () => {
    console.log("Video failed to load");
    setVideoLoading(false);
    setVideoError(true);
    setShowVideo(false);
    if (videoTimeout) {
      clearTimeout(videoTimeout);
      setVideoTimeout(null);
    }
  };

  if (loading) return <div className="p-8 text-center">Уншиж байна...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;
  if (!course) return <div className="p-8 text-center">Сургалт олдсонгүй</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section: Title + Intro + Buttons */}
      <section
        className="relative w-full min-h-[320px] md:min-h-[420px] flex items-center justify-center overflow-hidden"
        style={{
          background: `url(${
            course.heroImage ||
            "https://admin.mastermind.mn/images/1733878176391.jpg"
          }) center/cover no-repeat`,
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
            <p className="text-xl md:text-2xl mb-8 drop-shadow text-center text-white/90 font-medium whitespace-pre-line">
              {course.description}
            </p>
            <button
              onClick={handleVideoClick}
              className="bg-white/90 hover:bg-[#550080] hover:text-white text-black font-semibold px-10 py-4 rounded-2xl text-xl shadow-lg border border-white/40 transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-bounce-slow"
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
            <h2 className="text-2xl font-bold mb-2 text-[#550080]">
              Сургалтын ач холбогдол
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {course.goal || "Мэдээлэл байхгүй."}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#550080]">
              Хэнд зориулагдсан бэ?
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {course.target || "Мэдээлэл байхгүй."}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#550080]">
              Сургалтын хөтөлбөр
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
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
            {course.youtubeUrl && !videoError ? (
              <>
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                    <div className="flex flex-col items-center text-white">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                      <p>Видео уншиж байна...</p>
                    </div>
                  </div>
                )}
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(course.youtubeUrl)}
                  title="Youtube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-2xl"
                  onLoad={handleVideoLoad}
                  onError={handleVideoError}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-white p-8">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold mb-2">Видео олдсонгүй</h3>
                <p className="text-center text-gray-300 mb-4">
                  Уучлаарай, энэ сургалтын танилцуулга видео одоогоор боломжгүй
                  байна.
                </p>
                {course.youtubeUrl && (
                  <a
                    href={course.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    YouTube дээр үзэх
                  </a>
                )}
                <button
                  onClick={() => setShowVideo(false)}
                  className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Хаах
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Error Modal */}
      {videoError && !showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-4">
            <button
              onClick={() => setVideoError(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close error"
            >
              ×
            </button>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Видео олдсонгүй
              </h3>
              <p className="text-gray-600 mb-4">
                Уучлаарай, энэ сургалтын танилцуулга видео одоогоор боломжгүй
                байна.
              </p>
              {course?.youtubeUrl && (
                <a
                  href={course.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  YouTube дээр үзэх
                </a>
              )}
              <button
                onClick={() => setVideoError(false)}
                className="bg-[#550080] text-white px-6 py-2 rounded-lg hover:bg-[#440066] transition-colors"
              >
                Ойлголоо
              </button>
            </div>
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
              <div className="flex-1 text-lg text-gray-800 leading-relaxed whitespace-pre-line">
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
            className="bg-[#550080] hover:bg-[#550080] text-white font-bold px-12 py-5 rounded-2xl text-2xl shadow-xl transition-all duration-200 text-center"
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
          <h3 className="text-xl font-bold mb-2 text-[#550080]">
            Холбоо барих
          </h3>
          <div className="mb-1">
            Утас:{" "}
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="text-[#550080] hover:underline"
            >
              {CONTACT_PHONE}
            </a>
          </div>
          <div className="mb-1">
            И-мэйл:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#550080] hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="mb-1">{CONTACT_ADDRESS}</div>
        </div>
      </section>
    </div>
  );
}
