"use client";

import React, { useState, useEffect } from "react";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    price: "",
    currency: "MNT",
    duration: "",
    levels: [] as string[],
    category: "",
    instructor: "",
    youtubeUrl: "",
    heroImage: "",
    goal: "",
    target: "",
    structure: "",
    courseMaterials: "",
    enrollLink: "",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchLevels();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/course-filters/categories");
      if (response.ok) {
        const data = await response.json();
        const categoryNames = data.map((cat: any) => cat.name);
        console.log("Fetched categories:", categoryNames);
        setCategories(categoryNames);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await fetch("/api/course-filters/levels");
      if (response.ok) {
        const data = await response.json();
        const levelNames = data.map((level: any) => level.name);
        console.log("Fetched levels:", levelNames);
        setLevels(levelNames);
      }
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setForm({ ...form, levels: [...form.levels, level] });
    } else {
      setForm({ ...form, levels: form.levels.filter((l) => l !== level) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          content: form.description, // Use description as content
          price: parseFloat(form.price) || 0,
          duration: parseInt(form.duration) || 0,
          levels: form.levels, // Include the levels array
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create course");
      }

      alert("Амжилттай хадгалагдлаа!");
      // Reset form
      setForm({
        title: "",
        description: "",
        content: "",
        imageUrl: "",
        price: "",
        currency: "MNT",
        duration: "",
        levels: [],
        category: "",
        instructor: "",
        youtubeUrl: "",
        heroImage: "",
        goal: "",
        target: "",
        structure: "",
        courseMaterials: "",
        enrollLink: "",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      alert(
        `Алдаа гарлаа: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  console.log("Form render - categories:", categories, "levels:", levels);
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-6">
      <h2 className="text-2xl font-bold">Шинэ хичээл нэмэх</h2>

      <input
        type="text"
        name="title"
        placeholder="Хичээлийн нэр"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Тайлбар"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="Зургийн URL"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Үнэ (MNT)"
        value={form.price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="currency"
        value={form.currency}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="MNT">MNT</option>
        <option value="USD">USD</option>
      </select>

      <input
        type="number"
        name="duration"
        placeholder="Үргэлжлэх хугацаа (цаг)"
        value={form.duration}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Түвшин (олон сонгох боломжтой)
        </label>
        <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded p-3">
          {levels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={form.levels.includes(level)}
                onChange={(e) => handleLevelChange(level, e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
        {form.levels.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Сонгосон түвшинүүд:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {form.levels.map((level) => (
                <span
                  key={level}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {level}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Ангилал сонгох</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="instructor"
        placeholder="Багш"
        value={form.instructor}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="youtubeUrl"
        placeholder="Youtube видео URL"
        value={form.youtubeUrl}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="heroImage"
        placeholder="Hero section зураг URL"
        value={form.heroImage}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="goal"
        placeholder="Сургалтын зорилго"
        value={form.goal}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="target"
        placeholder="Хэнд зориулагдсан бэ?"
        value={form.target}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="structure"
        placeholder="Сургалтын бүтэц"
        value={form.structure}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="courseMaterials"
        placeholder="Сургалтад дагалдах зүйлс"
        value={form.courseMaterials}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="enrollLink"
        placeholder="Сургалтанд бүртгүүлэх Google Form линк"
        value={form.enrollLink}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Хадгалах
      </button>
    </form>
  );
};

export default AddCourse;
