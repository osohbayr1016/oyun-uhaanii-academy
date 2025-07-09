"use client";

import React, { useState } from "react";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    price: "",
    currency: "MNT",
    duration: "",
    level: "Эхлэгч",
    category: "",
    instructor: "",
    youtubeUrl: "",
    heroImage: "",
    goal: "",
    target: "",
    structure: "",
    enrollLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
        level: "Эхлэгч",
        category: "",
        instructor: "",
        youtubeUrl: "",
        heroImage: "",
        goal: "",
        target: "",
        structure: "",
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

      <select
        name="level"
        value={form.level}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="Эхлэгч">Эхлэгч</option>
        <option value="Дунд">Дунд</option>
        <option value="Дээд">Дээд</option>
      </select>

      <input
        type="text"
        name="category"
        placeholder="Ангилал"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

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
