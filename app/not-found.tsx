import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell">
      <section className="intro">
        <h1>404</h1>
        <p>여기엔 아무것도 없다.</p>
      </section>
      <p>
        <Link href="/" style={{ color: "var(--accent)" }}>
          처음으로
        </Link>
      </p>
    </div>
  );
}
