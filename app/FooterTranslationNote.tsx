"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Note() {
  const searchParams = useSearchParams();
  const isEn = searchParams.get("lang") === "en";
  if (!isEn) return null;
  return (
    <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
      Originally written in Korean
    </span>
  );
}

export default function FooterTranslationNote() {
  return (
    <Suspense fallback={null}>
      <Note />
    </Suspense>
  );
}
