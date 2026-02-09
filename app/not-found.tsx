import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center bg-background text-foreground">
      <h1 className="text-2xl font-semibold mb-2">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-6">
        The page you’re looking for doesn’t exist or couldn’t be loaded.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium no-underline hover:opacity-90 transition-opacity"
      >
        Go to home
      </Link>
    </div>
  )
}
