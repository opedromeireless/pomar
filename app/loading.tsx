export default function Loading() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="h-20 border-b border-line" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="h-3 w-40 animate-pulse rounded-full bg-line" />
        <div className="mt-6 h-12 w-3/4 animate-pulse rounded-lg bg-line" />
        <div className="mt-3 h-12 w-1/2 animate-pulse rounded-lg bg-line" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl bg-line" />
          ))}
        </div>
      </div>
    </div>
  );
}
