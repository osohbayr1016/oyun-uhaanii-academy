"use client";

import React, { useState } from "react";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
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
