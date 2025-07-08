"use client";

import React, { useState } from "react";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    youtubeUrl: "",
    heroImage: "",
    goal: "",
    target: "",
    structure: "",
    enrollLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        image: form.image,
        youtubeUrl: form.youtubeUrl,
        heroImage: form.heroImage,
        goal: form.goal,
        target: form.target,
        structure: form.structure,
        enrollLink: form.enrollLink,
      }),
    });

    alert("Амжилттай хадгалагдлаа!");
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
        name="image"
        placeholder="Зургийн URL"
        value={form.image}
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
        required
      />

      <input
        type="text"
        name="heroImage"
        placeholder="Hero section зураг URL"
        value={form.heroImage}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="goal"
        placeholder="Сургалтын зорилго"
        value={form.goal}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="target"
        placeholder="Хэнд зориулагдсан бэ?"
        value={form.target}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="structure"
        placeholder="Сургалтын бүтэц"
        value={form.structure}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="enrollLink"
        placeholder="Сургалтанд бүртгүүлэх Google Form линк"
        value={form.enrollLink}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
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
