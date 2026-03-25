import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "24px",
        fontFamily: "var(--l-font-family)",
      }}
    >
      <h1 style={{ fontSize: "40px", fontWeight: 700, margin: 0 }}>Letteros UI Kit</h1>
      <p style={{ fontSize: "18px", color: "#A9A9A9", margin: 0 }}>
        Дизайн-система сайта letteros.com — as-is
      </p>
      <Link
        href="/uikit"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: "54px",
          padding: "0 32px",
          borderRadius: "15px",
          background: "#001DFF",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "18px",
          textDecoration: "none",
          transition: "all 0.25s",
        }}
      >
        Открыть UI Kit
      </Link>
    </main>
  );
}
