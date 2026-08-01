import Image from "next/image";
import { getSectionIndex, type NumberedSectionKey } from "@/lib/section-index";

type SectionBracketLabelProps = {
  sectionKey?: NumberedSectionKey;
  index?: string;
  label: string;
  tone?: "cyan" | "black";
  showIndex?: boolean;
};

export function SectionBracketLabel({
  sectionKey,
  index,
  label,
  tone = "cyan",
  showIndex = true,
}: SectionBracketLabelProps) {
  const isCyan = tone === "cyan";
  const textClass = isCyan ? "text-[#c0edff]" : "text-black opacity-50";
  const bracketLeft = isCyan
    ? "/images/philosophy/bracket-cyan-left.svg"
    : "/images/hero/bracket-left.svg";
  const bracketRight = isCyan
    ? "/images/philosophy/bracket-cyan-right.svg"
    : "/images/hero/bracket-right.svg";
  const resolvedIndex = sectionKey ? getSectionIndex(sectionKey) : index;

  return (
    <div
      className={`flex shrink-0 items-center gap-2 whitespace-nowrap font-arc-mono text-base uppercase leading-none ${textClass}`}
    >
      <Image
        src={bracketLeft}
        alt=""
        width={7}
        height={20}
        className="h-5 w-[7px]"
      />
      {showIndex && resolvedIndex ? (
        <>
          <span>{resolvedIndex}</span>
          <span>/</span>
        </>
      ) : null}
      <span>{label}</span>
      <Image
        src={bracketRight}
        alt=""
        width={7}
        height={20}
        className="h-5 w-[7px]"
      />
    </div>
  );
}
