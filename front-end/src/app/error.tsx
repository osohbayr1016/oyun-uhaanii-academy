"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: 40, textAlign: "center" }}>
          <h2>Алдаа гарлаа!</h2>
          <p>{error.message}</p>
          <button
            style={{ marginTop: 20, padding: "8px 16px" }}
            onClick={() => reset()}
          >
            Дахин ачаалах
          </button>
        </div>
      </body>
    </html>
  );
}
