"use client";

import { useEffect, useState } from "react";

// Define the sections and fields for the club page
const HERO_FIELDS = [
  { key: "hero_title", label: "Клубийн нэр", type: "text" },
  { key: "hero_motto", label: "Клубийн уриа", type: "text" },
  { key: "hero_mission", label: "Клубийн зорилго", type: "text" },
  { key: "hero_logo", label: "Лого (image URL)", type: "image" },
  {
    key: "hero_bg_image",
    label: "Background image (image URL)",
    type: "image",
  },
  { key: "hero_stat_athletes", label: "Тамирчид", type: "text" },
  { key: "hero_stat_types", label: "Төрөл", type: "text" },
  { key: "hero_stat_coaches", label: "Дасгалжуулагч", type: "text" },
];

const TOURNAMENT_FIELDS = [
  { key: "tournaments_title", label: "Тэмцээний хэсгийн гарчиг", type: "text" },
  {
    key: "tournaments_description",
    label: "Тэмцээний хэсгийн тайлбар",
    type: "text",
  },
  { key: "tournaments_link", label: "Тэмцээний мэдээлэл линк", type: "text" },
];

const ACTIVITY_FIELDS = ["image", "title", "description"];
const TYPE_FIELDS = ["image", "title", "description"];
const REQUIREMENT_FIELDS = ["requirement"];
const AWARD_FIELDS = ["image", "title", "description"];

const SECTION_LABELS: Record<string, string> = {
  hero: "Клубийн үндсэн мэдээлэл",
  tournaments: "Нэрэмжит тэмцээнүүд",
  activities: "Үйл ажиллагаа",
  types: "Клубийн төрлүүд",
  requirements: "Гишүүн болох шаардлага",
  awards_international: "Олон улсын шагналууд",
  awards_domestic: "Дотоодын шагналууд",
};

function filterSection(content: any[], section: string) {
  return content.filter((item) => item.section === section);
}

export default function AdminClubInfoPage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all club content on mount
  useEffect(() => {
    setLoading(true);
    fetch("/api/club-content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setError("Failed to load club info"))
      .finally(() => setLoading(false));
  }, []);

  // Helper to get value by key
  const getValue = (key: string) =>
    content.find((c) => c.key === key)?.value || "";

  // Handle single field change
  const handleFieldChange = (key: string, value: string) => {
    setContent((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value } : item))
    );
  };

  // Handle save for single field
  const handleSaveField = async (
    key: string,
    value: string,
    type: string,
    section: string,
    order?: number
  ) => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const existing = content.find((c) => c.key === key);
      const method = existing ? "PUT" : "POST";
      const url = existing ? `/api/club-content/${key}` : "/api/club-content";
      const body = existing
        ? { value, type, section, order }
        : { key, value, type, section, order };
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setSuccess("Амжилттай хадгаллаа!");
    } catch (err) {
      setError("Хадгалах үед алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  // Handle add/remove for lists
  const handleAddListItem = (section: string, fields: string[]) => {
    // Find max order for this section
    const sectionItems = filterSection(content, section);
    const maxOrder = sectionItems.reduce(
      (max, item) => (item.order && item.order > max ? item.order : max),
      0
    );
    const newOrder = maxOrder + 1;
    fields.forEach((field) => {
      setContent((prev) => [
        ...prev,
        {
          key: `${section}_${field}_${newOrder}`,
          value: "",
          type: field === "image" ? "image" : "text",
          section,
          order: newOrder,
        },
      ]);
    });
  };
  const handleRemoveListItem = (
    section: string,
    order: number,
    fields: string[]
  ) => {
    setContent((prev) =>
      prev.filter(
        (item) =>
          !(
            item.section === section &&
            item.order === order &&
            fields.includes(item.key.split("_")[1])
          )
      )
    );
  };

  // Render helpers for lists
  const renderList = (section: string, fields: string[]) => {
    // Group by order
    const items = filterSection(content, section).reduce(
      (acc: any, item: any) => {
        if (!acc[item.order]) acc[item.order] = {};
        acc[item.order][item.key.split("_")[1]] = item;
        return acc;
      },
      {}
    );
    return (
      <div className="space-y-6">
        {Object.entries(items).map(([order, group]: any) => (
          <div key={order} className="border rounded-lg p-4 mb-2 bg-gray-50">
            <div className="flex flex-wrap gap-4 items-center">
              {fields.map((field) => (
                <div key={field} className="flex-1 min-w-[180px]">
                  <label className="block font-semibold mb-1">{field}</label>
                  <input
                    type={field === "image" ? "text" : "text"}
                    className="w-full border rounded px-3 py-2"
                    value={group[field]?.value || ""}
                    onChange={(e) =>
                      handleFieldChange(group[field]?.key, e.target.value)
                    }
                    disabled={saving}
                    placeholder={field}
                  />
                  <button
                    type="button"
                    className="text-xs text-blue-600 underline mt-1"
                    onClick={() =>
                      handleSaveField(
                        group[field]?.key,
                        group[field]?.value,
                        group[field]?.type,
                        section,
                        Number(order)
                      )
                    }
                    disabled={saving}
                  >
                    Хадгалах
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-xs text-red-600 underline ml-2"
                onClick={() =>
                  handleRemoveListItem(section, Number(order), fields)
                }
                disabled={saving}
              >
                Устгах
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-[#550080] text-white px-4 py-2 rounded font-bold hover:bg-[#6a1bb1] transition-colors"
          onClick={() => handleAddListItem(section, fields)}
          disabled={saving}
        >
          Нэмэх
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Клубийн мэдээлэл засах
      </h1>
      {loading ? (
        <div className="text-center text-gray-500">Уншиж байна...</div>
      ) : (
        <form className="space-y-10 bg-white p-6 rounded-xl shadow">
          {/* Hero Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">{SECTION_LABELS.hero}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HERO_FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="block font-semibold mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full border rounded px-3 py-2"
                    value={getValue(field.key)}
                    onChange={(e) =>
                      handleFieldChange(field.key, e.target.value)
                    }
                    disabled={saving}
                    placeholder={field.label}
                  />
                  <button
                    type="button"
                    className="text-xs text-blue-600 underline mt-1"
                    onClick={() =>
                      handleSaveField(
                        field.key,
                        getValue(field.key),
                        field.type,
                        "hero"
                      )
                    }
                    disabled={saving}
                  >
                    Хадгалах
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Tournaments Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              {SECTION_LABELS.tournaments}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TOURNAMENT_FIELDS.map((field) => (
                <div key={field.key}>
                  <label className="block font-semibold mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full border rounded px-3 py-2"
                    value={getValue(field.key)}
                    onChange={(e) =>
                      handleFieldChange(field.key, e.target.value)
                    }
                    disabled={saving}
                    placeholder={field.label}
                  />
                  <button
                    type="button"
                    className="text-xs text-blue-600 underline mt-1"
                    onClick={() =>
                      handleSaveField(
                        field.key,
                        getValue(field.key),
                        field.type,
                        "tournaments"
                      )
                    }
                    disabled={saving}
                  >
                    Хадгалах
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Activities Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              {SECTION_LABELS.activities}
            </h2>
            {renderList("activities", ACTIVITY_FIELDS)}
          </section>

          {/* Types Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">{SECTION_LABELS.types}</h2>
            {renderList("types", TYPE_FIELDS)}
          </section>

          {/* Requirements Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              {SECTION_LABELS.requirements}
            </h2>
            {renderList("requirements", REQUIREMENT_FIELDS)}
          </section>

          {/* Awards Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              {SECTION_LABELS.awards_international}
            </h2>
            {renderList("awards_international", AWARD_FIELDS)}
          </section>
          <section>
            <h2 className="text-xl font-bold mb-4">
              {SECTION_LABELS.awards_domestic}
            </h2>
            {renderList("awards_domestic", AWARD_FIELDS)}
          </section>

          {error && <div className="text-red-600 text-center">{error}</div>}
          {success && (
            <div className="text-green-600 text-center">{success}</div>
          )}
        </form>
      )}
    </div>
  );
}
