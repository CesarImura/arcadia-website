import Image from "next/image";
import Link from "next/link";
import { BracketArrow } from "@/components/ui/BracketArrow";
import type { UspCardItem } from "@/lib/usp-cards";

type UspCardProps = UspCardItem & {
  href: string;
  ctaLabel: string;
};

export function UspCard({
  number,
  title,
  description,
  href,
  ctaLabel,
}: UspCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[340px] flex-1 flex-col justify-between bg-white p-5 transition-colors duration-300 hover:bg-[#a9c0c9] lg:min-h-[420px] lg:min-w-0 lg:p-6 xl:min-h-[480px]"
    >
      <span className="inline-flex w-fit bg-[#a9c0c9] px-1 py-0.5 font-arc-mono text-lg leading-none text-[#04040d] transition-colors duration-300 group-hover:bg-black group-hover:text-[#a9c0c9]">
        {number}
      </span>

      <div
        className="pointer-events-none absolute right-5 top-5 flex items-center gap-1 text-black lg:right-6 lg:top-6 lg:gap-1.5"
        aria-hidden
      >
        <Image
          src="/images/usp/bracket-left.svg"
          alt=""
          width={23}
          height={71}
          className="h-[clamp(2rem,3.5vw,3.25rem)] w-auto"
        />
        <span className="font-arc-mono text-[clamp(2rem,4.5vw,4rem)] leading-none">
          /
        </span>
        <Image
          src="/images/usp/bracket-right.svg"
          alt=""
          width={23}
          height={71}
          className="h-[clamp(2rem,3.5vw,3.25rem)] w-auto -scale-y-100 rotate-180"
        />
      </div>

      <div className="mt-auto flex flex-col gap-5 lg:gap-6">
        <div className="space-y-2 text-black">
          <h3 className="font-arc-sans text-arc-card-title leading-[1.3]">
            {title}
          </h3>
          <p className="text-base leading-[1.5] text-black/70 lg:text-lg">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-1.5 font-arc-mono text-base leading-none text-black/80">
          <span>[</span>
          <span className="text-sm uppercase">{ctaLabel}</span>
          <BracketArrow />
          <span>]</span>
        </div>
      </div>
    </Link>
  );
}
