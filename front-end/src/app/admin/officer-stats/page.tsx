"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Home } from "lucide-react";
import { bearerHeaders } from "@/lib/authHeaders";
import { fetchBffJson } from "@/lib/fetchBffWithRetry";
import OfficerSectorStatsFields, {
  type OfficerSectorStatsValues,
} from "../home-content/OfficerSectorStatsFields";
import { parseOfficerStatsPayload } from "../home-content/parseOfficerStats";

export default function AdminOfficerStatsPage() {
  const [stats, setStats] = useState<OfficerSectorStatsValues>({
    courses: 1,
    tournaments: 1,
    enrollments: 1,
    teachers: 1,
    products: 1,
    years: 1,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBffJson<unknown>("/api/home-content/stats");
        if (!cancelled) setStats(parseOfficerStatsPayload(data));
      } catch (e) {
        console.error(e);
        if (!cancelled)
          setMessage({
            type: "error",
            text: "Тоонуудыг ачаалж чадсангүй. Дахин оролдоно уу.",
          });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/home-content/officer-stats", {
        method: "PUT",
        headers: bearerHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(stats),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message || "Хадгалж чадсангүй"
        );
      }
      setMessage({ type: "success", text: "Амжилттай хадгалагдлаа." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Алдаа гарлаа",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ОФИЦЕР САЛБАРЫН АМЖИЛТ
            </h1>
            <p className="text-gray-600">
              Нүүр хуудсын тоонуудыг эндээс засна
            </p>
          </div>
        </div>
        <Link
          href="/"
          target="_blank"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm"
        >
          <Home className="w-4 h-4 mr-2" />
          Нүүр харах
        </Link>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <OfficerSectorStatsFields value={stats} onChange={setStats} />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Хадгалж байна…" : "Хадгалах"}
          </button>
        </div>
      </form>
    </div>
  );
}
