"use client";

const CONTACT_PHONE = "+976 11302266";
const CONTACT_EMAIL = "bilguunundarmal@gmail.com";
const CONTACT_ADDRESS =
  "БЗД, 16-р хороо, Дандарбаатарын гудамж, 'ХОРГО' хотхон, 2-2 байр";

export default function CourseDetailExtras({
  sectionImage,
  sectionText,
  lessons,
  enrollLink,
}: {
  sectionImage?: string | null;
  sectionText?: string | null;
  lessons?: Array<{ id: string; title: string }>;
  enrollLink?: string | null;
}) {
  return (
    <>
      {(sectionImage || sectionText) && (
        <section className="flex w-full flex-col items-center bg-white px-4 py-16">
          <div className="flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row">
            {sectionImage && (
              <div className="mb-8 flex flex-1 justify-center md:mb-0">
                <img
                  src={sectionImage}
                  alt="Course section"
                  className="max-h-72 rounded-xl object-cover shadow-lg"
                />
              </div>
            )}
            {sectionText && (
              <div className="flex-1 whitespace-pre-line text-lg leading-relaxed text-gray-800">
                {sectionText}
              </div>
            )}
          </div>
        </section>
      )}
      {lessons && lessons.length > 0 && (
        <section className="flex w-full flex-col items-center bg-white px-4 py-8">
          <div className="w-full max-w-4xl">
            <h3 className="mb-3 text-2xl font-bold text-blue-700">Хичээлүүд</h3>
            <ul className="ml-8 list-disc text-lg text-gray-800">
              {lessons.map((lesson) => (
                <li key={lesson.id}>{lesson.title}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <div className="my-12 flex justify-center">
        {enrollLink ? (
          <a
            href={enrollLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-[#550080] px-12 py-5 text-center text-2xl font-bold text-white shadow-xl transition-all duration-200 hover:bg-[#550080]"
          >
            Сургалтанд бүртгүүлэх
          </a>
        ) : (
          <button
            type="button"
            className="cursor-not-allowed rounded-2xl bg-gray-400 px-12 py-5 text-2xl font-bold text-white shadow-xl"
            disabled
          >
            Сургалтанд бүртгүүлэх
          </button>
        )}
      </div>
      <section className="flex w-full flex-col items-center bg-blue-50 px-4 py-8">
        <div className="w-full max-w-3xl text-center">
          <h3 className="mb-2 text-xl font-bold text-[#550080]">
            Холбоо барих
          </h3>
          <div className="mb-1">
            Утас:{" "}
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="text-[#550080] hover:underline"
            >
              {CONTACT_PHONE}
            </a>
          </div>
          <div className="mb-1">
            И-мэйл:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#550080] hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="mb-1">{CONTACT_ADDRESS}</div>
        </div>
      </section>
    </>
  );
}
