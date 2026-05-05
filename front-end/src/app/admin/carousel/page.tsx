"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { bearerHeaders } from "@/lib/authHeaders";
import { fetchBffJson } from "@/lib/fetchBffWithRetry";
import AdminLoadErrorBanner from "../_components/AdminLoadErrorBanner";
import AdminR2ImageUpload from "../_components/AdminR2ImageUpload";

interface CarouselImage {
  id: string;
  imageUrl: string;
}

const API_CAROUSEL = "/api/carousel";

export default function AdminCarouselPage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await fetchBffJson<CarouselImage[]>(API_CAROUSEL);
      setImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
      setLoadError(
        error instanceof Error ? error.message : "Зургуудыг ачаалж чадсангүй"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAdd = async () => {
    if (!imageUrl.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(API_CAROUSEL, {
        method: "POST",
        headers: bearerHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ imageUrl: imageUrl.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Зураг нэмэхэд алдаа гарлаа");
      }

      setImageUrl("");
      await fetchImages();
      alert("Зураг амжилттай нэмэгдлээ");
    } catch (error) {
      console.error("Error adding image:", error);
      alert(
        error instanceof Error ? error.message : "Зураг нэмэхэд алдаа гарлаа"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Энэ зургийг устгахдаа итгэлтэй байна уу?")) return;

    try {
      setLoading(true);

      const response = await fetch(`${API_CAROUSEL}/${id}`, {
        method: "DELETE",
        headers: bearerHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Зураг устгахад алдаа гарлаа"
        );
      }

      // Remove the image from local state immediately for better UX
      setImages((prevImages) => prevImages.filter((img) => img.id !== id));
      alert("Зураг амжилттай устгагдлаа");

      // Refresh the data to ensure sync with backend
      setTimeout(() => {
        fetchImages();
      }, 100);
    } catch (error) {
      console.error("Error deleting image:", error);
      alert(
        error instanceof Error ? error.message : "Зураг устгахад алдаа гарлаа"
      );
      // Refresh the images list in case of error
      await fetchImages();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <AdminLoadErrorBanner message={loadError} />
      <h1 className="text-2xl font-bold mb-6">Карусел зураг удирдах</h1>
      <div className="mb-6 space-y-2">
        <AdminR2ImageUpload
          prefix="carousel"
          onUploaded={(url) => setImageUrl(url)}
        />
        <p className="text-sm text-gray-500">Эсвэл гадаад линк оруулна уу:</p>
      </div>
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
              <div className="relative w-full h-40">
                <Image
                  src={img.imageUrl}
                  alt="carousel"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/default-carousel.png";
                  }}
                />
              </div>
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
