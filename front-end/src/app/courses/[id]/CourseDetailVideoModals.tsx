"use client";

import { getYouTubeEmbedUrl } from "./courseYouTubeHelpers";

export default function CourseDetailVideoModals({
  course,
  showVideo,
  setShowVideo,
  videoError,
  setVideoError,
  videoLoading,
  onVideoLoad,
  onVideoError,
}: {
  course: {
    youtubeUrl?: string | null;
  };
  showVideo: boolean;
  setShowVideo: (v: boolean) => void;
  videoError: boolean;
  setVideoError: (v: boolean) => void;
  videoLoading: boolean;
  onVideoLoad: () => void;
  onVideoError: () => void;
}) {
  return (
    <>
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative flex aspect-video w-full max-w-3xl items-center justify-center rounded-2xl bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setShowVideo(false)}
              className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-2 text-2xl text-gray-900 shadow-lg hover:bg-white"
              aria-label="Close video"
            >
              ×
            </button>
            {course.youtubeUrl && !videoError ? (
              <>
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
                    <div className="flex flex-col items-center text-white">
                      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
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
                  className="h-full w-full rounded-2xl"
                  onLoad={onVideoLoad}
                  onError={onVideoError}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-white">
                <div className="mb-4 text-6xl">⚠️</div>
                <h3 className="mb-2 text-xl font-bold">Видео олдсонгүй</h3>
                <p className="mb-4 text-center text-gray-300">
                  Уучлаарай, энэ сургалтын танилцуулга видео одоогоор боломжгүй
                  байна.
                </p>
                {course.youtubeUrl && (
                  <a
                    href={course.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
                  >
                    YouTube дээр үзэх
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setShowVideo(false)}
                  className="rounded-lg bg-white px-6 py-2 text-black transition-colors hover:bg-gray-200"
                >
                  Хаах
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {videoError && !showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setVideoError(false)}
              className="absolute right-2 top-2 text-2xl text-gray-500 hover:text-gray-700"
              aria-label="Close error"
            >
              ×
            </button>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 text-6xl">⚠️</div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                Видео олдсонгүй
              </h3>
              <p className="mb-4 text-gray-600">
                Уучлаарай, энэ сургалтын танилцуулга видео одоогоор боломжгүй
                байна.
              </p>
              {course?.youtubeUrl && (
                <a
                  href={course.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
                >
                  YouTube дээр үзэх
                </a>
              )}
              <button
                type="button"
                onClick={() => setVideoError(false)}
                className="rounded-lg bg-[#550080] px-6 py-2 text-white transition-colors hover:bg-[#440066]"
              >
                Ойлголоо
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
