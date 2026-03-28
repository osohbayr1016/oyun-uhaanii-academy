"use client";

export default function PublicLoadErrorBanner({
  message,
  onRetry,
}: {
  message: string | null;
  onRetry: () => void;
}) {
  if (!message) return null;
  return (
    <div
      className="mx-auto max-w-lg rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800"
      role="alert"
    >
      <p className="mb-2">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-md bg-red-700 px-4 py-2 text-white hover:bg-red-800"
      >
        Дахин оролдох
      </button>
    </div>
  );
}
