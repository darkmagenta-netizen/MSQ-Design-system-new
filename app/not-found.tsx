import Link from "next/link"

export default function NotFound() {
  return (
    <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 8 }}>
        Page not found
      </h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        The page you’re looking for doesn’t exist or couldn’t be loaded.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#2960ec",
          color: "#fff",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Go to home
      </Link>
    </div>
  )
}
