"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Home } from "lucide-react";
import { bearerHeaders } from "@/lib/authHeaders";
import { fetchBffJson } from "@/lib/fetchBffWithRetry";
import OfficerSectorStatsFields, {
  type OfficerSectorStatsValues,
  type OfficerCardLabels,
  type LabelKey,
  type OfficerSectorStatsFieldsHandle,
} from "./OfficerSectorStatsFields";
import { parseOfficerStatsPayload } from "./parseOfficerStats";
import HeroFields from "./HeroFields";
import HeroStatsFields from "./HeroStatsFields";
import FeaturesTitleFields from "./FeaturesTitleFields";
import type { HomeContent } from "./types";

const AdminHomeContentPage = () => {
  const [content, setContent] = useState<HomeContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [officerStats, setOfficerStats] = useState<OfficerSectorStatsValues>({
    courses: 0, tournaments: 0, enrollments: 0, teachers: 0, products: 0, years: 0,
  });
  const officerStatsRef = useRef<OfficerSectorStatsFieldsHandle>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const data = await fetchBffJson<HomeContent>("/api/home-content");
      setContent(data);
    } catch { setMessage({ type: "error", text: "Нүүр хуудасны мэдээлэл ачааллаж чадсангүй" }); }
    try {
      const s = await fetchBffJson<unknown>("/api/home-content/stats");
      setOfficerStats(parseOfficerStatsPayload(s));
    } catch { /* stats load failure is non-fatal */ }
    finally { setLoading(false); }
  };

  const handleInputChange = (key: keyof HomeContent, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleLabelChange = (key: LabelKey, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const cardLabels: OfficerCardLabels = {
    feature_1_title: content.feature_1_title,
    feature_2_title: content.feature_2_title,
    feature_3_title: content.feature_3_title,
    feature_4_title: content.feature_4_title,
    feature_5_title: content.feature_5_title,
    feature_6_title: content.feature_6_title,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const statsPayload =
      officerStatsRef.current?.flushDraftsToParent() ?? officerStats;
    setSaving(true);
    setMessage(null);
    try {
      const statsRes = await fetch("/api/home-content/officer-stats", {
        method: "PUT",
        headers: bearerHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(statsPayload),
      });
      if (!statsRes.ok) {
        const err = await statsRes.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Офицер тоог хадгалж чадсангүй");
      }
      const res = await fetch("/api/home-content", {
        method: "PUT",
        headers: bearerHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("Нүүр хуудас хадгалж чадсангүй");
      setMessage({ type: "success", text: "Амжилттай хадгалагдлаа." });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Алдаа гарлаа" });
    } finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/admin" className="mr-4">
                <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Нүүр хуудасны агуулга</h1>
                <p className="text-gray-600">Нүүр хуудасны текст болон тоонуудыг засах</p>
              </div>
            </div>
            <Link href="/" target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-2" />Нүүр хуудас харах
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <OfficerSectorStatsFields
            ref={officerStatsRef}
            values={officerStats}
            labels={cardLabels}
            onValueChange={setOfficerStats}
            onLabelChange={handleLabelChange}
          />
          <FeaturesTitleFields content={content} onChange={handleInputChange} />
          <HeroFields content={content} onChange={handleInputChange} />
          <HeroStatsFields content={content} onChange={handleInputChange} />

          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHomeContentPage;
