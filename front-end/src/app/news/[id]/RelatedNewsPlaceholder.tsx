export default function RelatedNewsPlaceholder() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Бусад мэдээ</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-gray-400 text-4xl mb-4">📰</div>
          <p className="text-gray-600">Удахгүй бусад мэдээ нэмэгдэх болно.</p>
        </div>
      </div>
    </div>
  );
}
