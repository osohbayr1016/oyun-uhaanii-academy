"use client";

import { useState, type ReactNode } from "react";

type Props = {
  src?: string | null;
  alt: string;
  fallback: ReactNode;
};

export default function AdminListThumbnail({ src, alt, fallback }: Props) {
  const [failed, setFailed] = useState(false);
  const trimmed = src?.trim();
  if (!trimmed || failed) {
    return (
      <div className="relative h-48 w-full overflow-hidden">{fallback}</div>
    );
  }
  return (
    <div className="relative h-48 w-full bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={trimmed}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
