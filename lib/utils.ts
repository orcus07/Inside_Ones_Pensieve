/** `2026-07-27` → `2026년 7월 27일` (ko) or `Jul 27, 2026` (en) */
export function formatDate(iso: string, lang: "ko" | "en" = "ko"): string {
  const [y, m, d] = iso.split("-");
  if (lang === "en") {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
  }
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}
