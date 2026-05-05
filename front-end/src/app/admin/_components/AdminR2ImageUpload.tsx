"use client";

import { useState } from "react";
import { bearerHeaders } from "@/lib/authHeaders";

export type AdminUploadPrefix =
  | "courses"
  | "tournaments"
  | "news"
  | "carousel";

type Props = {
  prefix: AdminUploadPrefix;
  onUploaded: (url: string) => void;
  /** When false, upload is hidden (e.g. read-only) */
  disabled?: boolean;
};

export default function AdminR2ImageUpload({
  prefix,
  onUploaded,
  disabled = false,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || disabled) return;
    setErr(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("prefix", prefix);
      const res = await fetch("/api/uploads", {
        method: "POST",
        headers: bearerHeaders(),
        body: fd,
      });
      let data: { message?: string; error?: string; url?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON */
      }
      if (!res.ok) {
        throw new Error(
          data.message || data.error || `Upload failed (${res.status})`
        );
      }
      if (!data.url) throw new Error("No URL returned from server");
      onUploaded(data.url);
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-1">
      <label className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <span>R2-с оруулах:</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={busy || disabled}
          onChange={onPick}
          className="max-w-[220px] text-xs file:mr-2 file:rounded file:border file:border-gray-300 file:bg-white file:px-2 file:py-1"
        />
        {busy && <span className="text-xs text-blue-600">Оруулж байна...</span>}
      </label>
      {err ? <p className="mt-1 text-xs text-red-600">{err}</p> : null}
    </div>
  );
}
