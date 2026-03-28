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
} from "../home-content/OfficerSectorStatsFields";
import { parseOfficerStatsPayload } from "../home-content/parseOfficerStats";

const LABEL_KEYS: LabelKey[] = [
  "feature_1_title", "feature_2_title", "feature_3_title",
  "feature_4_title", "feature_5_title", "feature_6_title",
];

type HomeContent = Partial<Record<LabelKey, string>>;

export default function AdminOfficerStatsPage() {
  const [stats, setStats] = useState<OfficerSectorStatsValues>({
    courses: 0, tournaments: 0, enrollments: 0, teachers: 0, products: 0, years: 0,
  });
  const [labels, setLabels] = useState<OfficerCardLabels>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const officerStatsRef = useRef<OfficerSectorStatsFieldsHandle>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [statsData, contentData] = await Promise.all([
          fetchBffJson<unknown>("/api/home-content/stats"),
          fetchBffJson<HomeContent>("/api/home-content"),
        ]);
        if (cancelled) return;
        setStats(parseOfficerStatsPayload(statsData));
        const raw = contentData as Record<string, unknown>;
        const parsed: OfficerCardLabels = {};
        for (const k of LABEL_KEYS) {
          if (typeof raw[k] === "string") parsed[k] = raw[k] as string;
        }
        setLabels(parsed);
      } catch (e) {
        console.error(e);
        if (!cancelled) setMessage({ type: "error", text: "Тоонуудыг ачаалж чадсангүй." });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleLabelChange = (key: LabelKey, value: string) => {
    setLabels((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const statsPayload =
      officerStatsRef.current?.flushDraftsToParent() ?? stats;
    setSaving(true);
    setMessage(null);
    try {
      const [statsRes, contentRes] = await Promise.all([
        fetch("/api/home-content/officer-stats", {
          method: "PUT",
          headers: bearerHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify(statsPayload),
        }),
        fetch("/api/home-content", {
          method: "PUT",
          headers: bearerHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify(labels),
        }),
      ]);
      if (!statsRes.ok) {
        const err = await statsRes.json().catch(() => ({})) as { message?: string; detail?: string };
        throw new Error(err.detail || err.message || `Stats save failed (${statsRes.status})`);
      }
      if (!contentRes.ok) {
        const err = await contentRes.json().catch(() => ({})) as { message?: string };
        throw new Error(err.message || `Content save failed (${contentRes.status})`);
      }
      setMessage({ type: "success", text: "Амжилттай хадгалагдлаа." });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Алдаа гарлаа" });
    } finally { setSaving(false); }
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
            <h1 className="text-2xl font-bold text-gray-900">ОФИЦЕР САЛБАРЫН АМЖИЛТ</h1>
            <p className="text-gray-600">Гарчиг болон тоонуудыг эндээс засна</p>
          </div>
        </div>
        <Link href="/" target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm">
          <Home className="w-4 h-4 mr-2" />Нүүр харах
        </Link>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <OfficerSectorStatsFields
          ref={officerStatsRef}
          values={stats}
          labels={labels}
          onValueChange={setStats}
          onLabelChange={handleLabelChange}
        />
        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Хадгалж байна…" : "Хадгалах"}
          </button>
        </div>
      </form>
    </div>
  );
}
