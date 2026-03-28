export default function NewsArticleLoading() {
  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div
        className="h-12 w-12 rounded-full border-4 border-[#550080] border-t-transparent animate-spin"
        aria-hidden
      />
      <p className="mt-6 text-lg font-medium text-gray-700">Уншиж байна...</p>
      <p className="mt-2 text-sm text-gray-500">Мэдээний агуулга ачаалагдаж байна</p>
    </div>
  );
}
