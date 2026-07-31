type StatsGridProps = {
  stats?: { value: string; label: string }[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  if (!stats?.length) return null;

  return (
    <section className="border-y border-border bg-neutral-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={`${stat.value}-${stat.label}`} className="space-y-2">
            <p className="text-4xl font-semibold">{stat.value}</p>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
