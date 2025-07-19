"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function UnsubscribePage() {
  const params = useParams();
  const token = params.token as string;
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const response = await fetch(
          `${backendUrl}/api/newsletter/unsubscribe/${token}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "Алдаа гарлаа");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Серверийн алдаа");
      }
    };

    if (token) {
      unsubscribe();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Мэдээний жагсаалт
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {status === "loading" && "Уншиж байна..."}
            {status === "success" && "Амжилттай"}
            {status === "error" && "Алдаа"}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {status === "loading" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Бүртгэлийг шалгаж байна...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Амжилттай хасагдлаа
              </h3>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Алдаа гарлаа
              </h3>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Нүүр хуудас руу буцах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
