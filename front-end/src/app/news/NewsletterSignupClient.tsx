"use client";

import { useState } from "react";

export default function NewsletterSignupClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Имэйл хаяг оруулна уу");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Амжилттай бүртгэгдлээ");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Алдаа гарлаа");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Серверийн алдаа");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        Мэдээний жагсаалтад бүртгүүлэх
      </h2>
      <p className="text-gray-600 mb-6">
        Шинэ мэдээ, арга хэмжээний мэдээллийг имэйлээр хүлээн аваарай.
      </p>
      <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Имэйл хаягаа оруулна уу"
            className="flex-1 px-4 py-3 border border-gray-300 sm:rounded-l-lg sm:rounded-r-none rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#550080] text-white px-6 py-3 sm:rounded-r-lg sm:rounded-l-none rounded-b-lg hover:bg-[#550080] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Илгээж байна...
              </div>
            ) : (
              "Бүртгүүлэх"
            )}
          </button>
        </div>
        {message && (
          <p
            className={`mt-3 text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
