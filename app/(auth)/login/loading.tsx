export default function LoginLoading() {
  return (
    <main className="min-h-screen bg-surface px-4 py-8">
      <div className="mx-auto grid max-w-xl gap-4">
        <div className="h-10 w-28 animate-pulse rounded-full bg-white" />
        <div className="h-48 animate-pulse rounded-[2rem] bg-white" />
        <div className="h-56 animate-pulse rounded-[2rem] bg-white" />
      </div>
    </main>
  );
}
