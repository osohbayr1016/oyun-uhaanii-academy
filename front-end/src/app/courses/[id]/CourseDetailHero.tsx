"use client";

export default function CourseDetailHero({
  course,
  onVideoClick,
}: {
  course: {
    title: string;
    description: string;
    heroImage?: string | null;
  };
  onVideoClick: () => void;
}) {
  return (
    <section
      className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden md:min-h-[420px]"
      style={{
        background: `url(${
          course.heroImage ||
          "https://admin.mastermind.mn/images/1733878176391.jpg"
        }) center/cover no-repeat`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/40 to-blue-700/30" />
      <svg
        className="absolute left-0 top-0 h-64 w-64 opacity-30 blur-2xl"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle fill="#60a5fa" cx="100" cy="100" r="100" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 h-80 w-80 opacity-20 blur-3xl"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="#fbbf24" x="0" y="0" width="200" height="200" rx="80" />
      </svg>
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-4 py-12">
        <div className="flex animate-fade-in-up flex-col items-center rounded-3xl border border-white/30 bg-white/20 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="mb-4 text-center text-5xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-6xl">
            {course.title}
          </h1>
          <p className="mb-8 whitespace-pre-line text-center text-xl font-medium text-white/90 drop-shadow md:text-2xl">
            {course.description}
          </p>
          <button
            type="button"
            onClick={onVideoClick}
            className="animate-bounce-slow rounded-2xl border border-white/40 bg-white/90 px-10 py-4 text-center text-xl font-semibold text-black shadow-lg transition-all duration-200 hover:bg-[#550080] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Танилцуулга Видео
          </button>
        </div>
      </div>
    </section>
  );
}
