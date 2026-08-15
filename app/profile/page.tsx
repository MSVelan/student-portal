import ProfileCard from "@/components/ProfileCard";

export default function ProfilePage() {
  // Placeholder userId until session/auth context is added — using 1 for demo
  const userId = 1;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <ProfileCard userId={userId} />
    </main>
  );
}
