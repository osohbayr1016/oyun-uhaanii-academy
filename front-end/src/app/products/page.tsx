import Header from "../_components/Header";
import Footer from "../_components/Footer";

const ProductsPage = () => {
  const products = [
    {
      id: "1",
      name: "Монголын түүхэн ном",
      price: 45000,
      currency: "₮",
      imageUrl: "/xyno.jpg",
      description: "Монголын түүхэн дэх чухал үйл явдлууд",
      category: "Ном",
      stock: 50,
    },
    {
      id: "2",
      name: "Уран зохиолын хрестоматия",
      price: 35000,
      currency: "₮",
      imageUrl: "/xyno.jpg",
      description: "Монголын сонгодог уран зохиолын сонголт",
      category: "Ном",
      stock: 30,
    },
    {
      id: "3",
      name: "Географийн атлас",
      price: 25000,
      currency: "₮",
      imageUrl: "/xyno.jpg",
      description: "Монгол улсын дэлгэрэнгүй газрын зураг",
      category: "Атлас",
      stock: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-12 mt-16">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Бүтээгдэхүүнүүд
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            Монголын соёл, түүх, уран зохиолтой холбоотой бүтээгдэхүүнүүд
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {product.price.toLocaleString()} {product.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Нөөц: {product.stock}</span>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Сагсанд нэмэх
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
