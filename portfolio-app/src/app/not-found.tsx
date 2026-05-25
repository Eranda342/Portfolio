import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="glass-card p-12 max-w-md w-full rounded-3xl">
        <p className="section-label mb-4">404</p>
        <h1
          className="font-display font-bold text-4xl text-white mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          Page Not Found
        </h1>
        <p className="text-white/45 font-sans mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-sans font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
