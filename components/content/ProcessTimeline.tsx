type ProcessTimelineProps = {
  progress: number;
};

export function ProcessTimeline({ progress }: ProcessTimelineProps) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const clipBottom = (1 - clamped) * 100;

  return (
    <div
      className="pointer-events-none absolute -top-16 bottom-0 left-0 w-8"
      aria-hidden
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-[url('/images/process/timeline-ruler.svg')] bg-[length:32px_auto] bg-left-top bg-repeat-y opacity-20" />

        <div
          className="absolute inset-0 bg-[url('/images/process/timeline-ruler-cyan.svg')] bg-[length:32px_auto] bg-left-top bg-repeat-y opacity-50"
          style={{ clipPath: `inset(0 0 ${clipBottom}% 0)` }}
        />
      </div>
    </div>
  );
}
