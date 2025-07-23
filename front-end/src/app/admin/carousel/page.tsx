"use client";
import { useEffect, useState } from "react";

interface CarouselImage {
  id: string;
  imageUrl: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const API_CAROUSEL = BACKEND_URL
  ? `${BACKEND_URL}/api/carousel`
  : "/api/carousel";

export default function AdminCarouselPage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const res = await fetch(API_CAROUSEL);
    const data = await res.json();
    setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAdd = async () => {
    if (!imageUrl.trim()) return;
    await fetch(API_CAROUSEL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: imageUrl.trim() }),
    });
    setImageUrl("");
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_CAROUSEL}/${id}`, { method: "DELETE" });
    fetchImages();
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Карусел зураг удирдах</h1>
      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Зурагны URL оруулна уу"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!imageUrl.trim()}
        >
          Зураг нэмэх
        </button>
      </div>
      {loading ? (
        <div>Уншиж байна...</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group border rounded-lg overflow-hidden"
            >
              <img
                src={img.imageUrl}
                alt="carousel"
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 text-xs opacity-80 group-hover:opacity-100"
              >
                Устгах
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
