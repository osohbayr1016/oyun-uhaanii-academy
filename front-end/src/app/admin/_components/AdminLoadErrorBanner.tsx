"use client";

export default function AdminLoadErrorBanner({
  message,
}: {
  message: string | null;
}) {
  if (!message) return null;
  return (
    <div
      className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
      role="alert"
    >
      {message}
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="ml-3 underline font-medium"
      >
        Дахин ачаалах
      </button>
    </div>
  );
}
