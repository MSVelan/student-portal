import TimetableView from "@/components/TimetableView";

export default function DashboardPage() {
  const userId = 1; // placeholder until auth/session context is added

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 py-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <TimetableView userId={userId} />
    </main>
  );
}
