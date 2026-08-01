import Link from "next/link";
import type { SocialProofMetric } from "@/lib/social-proof-metrics";

type SocialProofMetricCardProps = {
  metric: SocialProofMetric;
};

export function SocialProofMetricCard({ metric }: SocialProofMetricCardProps) {
  return (
    <Link
      href={metric.href}
      draggable={false}
      className="flex w-[280px] shrink-0 flex-col justify-between gap-16 bg-white p-4 transition-colors hover:bg-white/90 sm:w-[330px] sm:gap-[197px]"
    >
      <p className="font-arc-sans text-xl leading-none text-black">
        {metric.client}
      </p>

      <div className="flex flex-col gap-2">
        <p className="font-arc-sans text-[32px] leading-[1.3] text-black">
          {metric.value}
        </p>
        <p className="text-lg leading-[1.5] text-black/70">{metric.label}</p>
      </div>
    </Link>
  );
}
