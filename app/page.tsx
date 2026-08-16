import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800">Student Portal</h1>
      <p className="text-gray-500">Your one-stop hub for college life.</p>
      <nav className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
        >
          Sign Up
        </Link>
      </nav>
    </main>
  );
}
