export default function AppLoading() {
  return (
    <main className="grid gap-4">
      <div className="h-10 w-40 animate-pulse rounded-full bg-white/70" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-32 animate-pulse rounded-[2rem] bg-white/80" />
        <div className="h-32 animate-pulse rounded-[2rem] bg-white/80" />
      </div>
      <div className="h-48 animate-pulse rounded-[2rem] bg-white/80" />
      <div className="h-48 animate-pulse rounded-[2rem] bg-white/80" />
    </main>
  );
}
