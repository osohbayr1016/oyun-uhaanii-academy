"use client";

export default function CourseDetailAbout({
  goal,
  courseMaterials,
  target,
  structure,
}: {
  goal?: string | null;
  courseMaterials?: string | null;
  target?: string | null;
  structure?: string | null;
}) {
  return (
    <section className="flex w-full flex-col items-center bg-white px-4 py-12">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-[#550080]">
            Сургалтын ач холбогдол
          </h2>
          <p className="whitespace-pre-line text-gray-700">
            {goal || "Мэдээлэл байхгүй."}
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold text-[#550080]">
            Сургалтад дагалдах зүйлс
          </h2>
          <p className="whitespace-pre-line text-gray-700">
            {courseMaterials || "Мэдээлэл байхгүй."}
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold text-[#550080]">
            Хэнд зориулагдсан бэ?
          </h2>
          <p className="whitespace-pre-line text-gray-700">
            {target || "Мэдээлэл байхгүй."}
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold text-[#550080]">
            Сургалтын хөтөлбөр
          </h2>
          <p className="whitespace-pre-line text-gray-700">
            {structure || "Мэдээлэл байхгүй."}
          </p>
        </div>
      </div>
    </section>
  );
}
